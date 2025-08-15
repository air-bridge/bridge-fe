import { CreateOrderHeading } from "../../../components/order-heading/CreateOrderHeading.tsx";
import { OrderForm } from "../../../components/order-form";
import { Alert, Container, Stack } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { OrderFormValues, OrderStatus } from "../../../types/order.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { boolean, string } from "yup";
import { useState } from "react";
import { OrderDetails } from "../../../components/order-form/order-details.tsx";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../../api/order.ts";
import { useNotificationContext } from "../../../context/notification/util.ts";
import { useNavigate } from "react-router-dom";
import { isValidPhoneNumber } from "../../../utils/validate-phone.ts";

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

const initialValues: OrderFormValues = {
  title: "",
  package_type: ["box"],
  weight: null,
  destination_address: "",
  destination_country: "",
  destination_state: "",
  pickup_address: "",
  pickup_country: "",
  pickup_state: "",
  receiver_firstname: "",
  receiver_lastname: "",
  receiver_phone: "",
  delivery_note: "",
  status: OrderStatus.Inactive, // todo: change to draft
  terms: true,
  image1: null,
  image2: null,
  image3: null,
};

export const CreateOrderScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showReview, setShowReview] = useState(false);
  const methods = useForm<OrderFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
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
    if (showReview) {
      // TODO: further validation update
      mutate({
        ...data,
        status: OrderStatus.Active,
      });
    } else {
      mutate(data);
    }
  };

  const handleShowReview = async () => {
    const isValidForm = await methods.trigger();
    if (isValidForm) {
      setShowReview(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Stack gap={{ xs: 2, lg: 3 }}>
          <CreateOrderHeading
            showReview={showReview}
            onSetShowReview={handleShowReview}
            onBack={() => setShowReview(false)}
            isPending={isPending}
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
            {showReview ? <OrderDetails /> : <OrderForm />}
          </Container>
        </Stack>
      </form>
    </FormProvider>
  );
};
