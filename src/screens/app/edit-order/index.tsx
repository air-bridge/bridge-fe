import { CreateOrderHeading } from "../../../components/order-heading/CreateOrderHeading.tsx";
import { OrderForm } from "../../../components/order-form";
import { Alert, Container, Stack } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { OrderFormValues, OrderStatus } from "../../../types/order.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { boolean, string } from "yup";
import { useEffect, useMemo, useState } from "react";
import { OrderDetails } from "../../../components/order-form/order-details.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrder, updateOrder } from "../../../api/order.ts";
import { useNotificationContext } from "../../../context/notification/util.ts";
import { useNavigate, useParams } from "react-router-dom";
import { isValidPhoneNumber } from "../../../utils/validate-phone.ts";
import { Loading } from "../../../components/loading";
import { ErrorInfo } from "../../../components/error-info";

const schema: yup.ObjectSchema<OrderFormValues> = yup.object({
  title: yup.string().required("Title is required"),
  status: yup.mixed<OrderStatus>().notRequired().nullable(),
  package_type: yup
    .array()
    .of(yup.string().required("Package Type is required"))
    .min(1, "Select at least one item")
    .required("Package Type is required"),
  weight: yup
    .number()
    .nullable()
    .typeError("Weight must be a number")
    .positive("Weight must be a positive number"),
  destination_address: yup.string().required("Destination address is required"),
  destination_state: yup.string().required("Destination state is required"),
  destination_country: yup.string().required("Destination country is required"),
  pickup_address: yup.string().required("Pickup address is required"),
  pickup_state: yup.string().required("Pickup state is required"),
  pickup_country: yup.string().required("Pickup country is required"),
  receiver_firstname: yup.string().nullable().notRequired(),
  receiver_lastname: yup.string().nullable().notRequired(),
  receiver_phone: string()
    .nullable()
    .notRequired()
    .test("is-valid-phone", "Phone number is not valid", function (value) {
      if (!value) {
        return true;
      }

      return isValidPhoneNumber(value);
    }),
  terms: boolean()
    .required("You need to agree to our terms & condition to continue")
    .oneOf([true], "You need to agree to our terms & condition to continue"),
  delivery_note: yup.string().nullable().notRequired(),
  image1: yup.mixed<File | string>().nullable().notRequired(),
  image2: yup.mixed<File | string>().nullable().notRequired(),
  image3: yup.mixed<File | string>().nullable().notRequired(),
});

export const EditOrderScreen = () => {
  const [showReview, setShowReview] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { orderId = "" } = useParams();
  const {
    data: order,
    isLoading,
    isError: isGetOrder,
    error: fetchOrderError,
  } = useQuery({
    queryKey: ["edit-order-details", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });

  const initialValues = useMemo(() => {
    return {
      title: order?.title || "",
      package_type: order?.package_type || ["box"],
      weight: order?.weight || null,
      destination_address: order?.destination_address || "",
      destination_country: order?.destination_country || "",
      destination_state: order?.destination_state || "",
      pickup_address: order?.pickup_address || "",
      pickup_country: order?.pickup_country || "",
      pickup_state: order?.pickup_state || "",
      receiver_firstname: order?.receiver_firstname || "",
      receiver_lastname: order?.receiver_lastname || "",
      receiver_phone: order?.receiver_phone || "",
      delivery_note: order?.delivery_note || "",
      status: order?.status || OrderStatus.Inactive, // todo: change to draft
      terms: true,
      image1: order?.image1 || null,
      image2: order?.image2 || null,
      image3: order?.image3 || null,
    };
  }, [order]);

  const methods = useForm<OrderFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: OrderFormValues) => updateOrder(orderId, payload),
    onSuccess: () => {
      setErrorMessage("");
      if (!showReview) {
        openNotification("Order saved for later successfully");
        navigate("/");
      } else {
        // TODO: add order id to URL
        navigate("/pool-list");
      }
    },
    onError: (data) => {
      setErrorMessage(data.message);
      setShowReview(false);
    },
  });

  const onSubmit: SubmitHandler<OrderFormValues> = (data) => {
    // TODO: further validation update
    // TODO: confirm status for order when ready for matching
    mutate({
      ...data,
      status: showReview ? OrderStatus.Active : OrderStatus.Inactive,
    });
  };

  const handleShowReview = async () => {
    const isValidForm = await methods.trigger();
    if (isValidForm) {
      setShowReview(true);
    }
  };

  useEffect(() => {
    methods.reset(initialValues);
  }, [initialValues]);

  if (isLoading) {
    return <Loading />;
  }

  if (isGetOrder) {
    return <ErrorInfo message={fetchOrderError?.message} />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Stack gap={{ xs: 2, lg: 3 }}>
          <CreateOrderHeading
            showReview={showReview}
            onSetShowReview={handleShowReview}
            onBack={() => setShowReview(false)}
            isPending={isPending}
            isEdit
          />

          <Container
            sx={{
              maxWidth: { xs: "100%", lg: "620px" },
              px: { xs: 2, lg: 0 },
              py: 3,
              pt: { xs: 0, lg: "100px" },
            }}
          >
            {errorMessage && (
              <Alert severity="error" variant="filled" sx={{ mb: 1 }}>
                {errorMessage}
              </Alert>
            )}
            {showReview ? <OrderDetails /> : <OrderForm editMode />}
          </Container>
        </Stack>
      </form>
    </FormProvider>
  );
};
