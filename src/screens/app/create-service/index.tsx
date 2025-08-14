import { Alert, Container, Stack } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { boolean, string, mixed, number, object, ObjectSchema } from "yup";
import { useState } from "react";
import { OrderDetails } from "../../../components/order-form/order-details.tsx";
import { useMutation } from "@tanstack/react-query";
import { useNotificationContext } from "../../../context/notification/util.ts";
import { useNavigate } from "react-router-dom";
import { isValidPhoneNumber } from "../../../utils/validate-phone.ts";
import { CreateServiceHeading } from "../../../components/service-heading/CreateServiceHeading.tsx";
import { ServiceForm } from "../../../components/service-form";
import { ServiceFormValues, ServiceStatus } from "../../../types/service.ts";
import { createService } from "../../../api/service.ts";

const schema: ObjectSchema<ServiceFormValues> = object({
  title: string().required("Title is required"),
  currency: string().required("Currency is required"),
  status: mixed<ServiceStatus>().notRequired().nullable(),
  transport_type: string().notRequired().nullable(),
  weight: number()
    .required("Weight is required")
    .typeError("Weight must be a number")
    .positive("Weight must be a positive number"),
  price_per_kg: number()
    .required("Price per KG is required")
    .typeError("Price must be a number")
    .positive("Price must be a positive number"),
  departure_city: string().required("Departure city is required"),
  departure_country: string().required("Departure country is required"),
  departure_date: string().required("Departure date is required"),
  arrival_city: string().required("Arrival city is required"),
  arrival_country: string().required("Arrival country is required"),
  arrival_date: string()
    .required("Arrival date is required")
    .test(
      "is-valid-arrival",
      "Arrival date should not be before departure data",
      function (value: string) {
        if (this.parent.departure_date) {
          return (
            dayjs(this.parent.departure_date).isSame(dayjs(value), "date") ||
            dayjs(this.parent.departure_date).isBefore(dayjs(value), "date")
          );
        }
      },
    ),
  phone: string()
    .required("Phone is required")
    .test("is-valid-phone", "Phone number is not valid", function (value) {
      if (!value) {
        return true;
      }

      return isValidPhoneNumber(value);
    }),
  terms: boolean()
    .required("You need to agree to our terms & condition to continue")
    .oneOf([true], "You need to agree to our terms & condition to continue"),
  delivery_note: string().nullable().notRequired(),
});

const initialValues: ServiceFormValues = {
  title: "",
  weight: 5,
  arrival_city: "",
  price_per_kg: 1,
  arrival_country: "",
  arrival_date: "",
  currency: "",
  departure_city: "",
  departure_country: "",
  departure_date: "",
  phone: "",
  transport_type: null,
  delivery_note: "",
};

export const CreateServiceScreen = () => {
  const [showReview, setShowReview] = useState(false);
  const methods = useForm<ServiceFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      if (!showReview) {
        openNotification("Order saved for later successfully");
        navigate("/");
      } else {
        // TODO: add order id to URL
        navigate("/pool-list");
      }
    },
    onError: () => {
      setShowReview(false);
    },
  });

  const onSubmit: SubmitHandler<ServiceFormValues> = (data) => {
    if (showReview) {
      // TODO: further validation update
      mutate({
        ...data,
        status: ServiceStatus.Active,
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
          <CreateServiceHeading
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
            {isError && (
              <Alert severity="error" variant="filled" sx={{ mb: 1 }}>
                {error?.message}
              </Alert>
            )}
            {showReview ? <OrderDetails /> : <ServiceForm />}
          </Container>
        </Stack>
      </form>
    </FormProvider>
  );
};
