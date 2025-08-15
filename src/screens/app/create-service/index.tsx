import { Alert, Container, Stack } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { OrderDetails } from "../../../components/order-form/order-details.tsx";
import { useMutation } from "@tanstack/react-query";
import { useNotificationContext } from "../../../context/notification/util.ts";
import { useNavigate } from "react-router-dom";
import { CreateServiceHeading } from "../../../components/service-heading/CreateServiceHeading.tsx";
import { ServiceForm } from "../../../components/service-form";
import { ServiceFormValues, ServiceStatus } from "../../../types/service.ts";
import { createService } from "../../../api/service.ts";
import { serviceFormSchema } from "../../../components/service-form/util.ts";

const initialValues: ServiceFormValues = {
  title: "",
  arrival_city: "",
  arrival_country: "",
  arrival_date: "",
  currency: "USD",
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
    resolver: yupResolver(serviceFormSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      const message = showReview
        ? "Service created successfully"
        : "Service saved for later successfully";
      openNotification(message);
      navigate("/");
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

  console.log("err", methods.formState.errors);

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
