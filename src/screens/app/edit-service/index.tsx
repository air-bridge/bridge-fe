import { Alert, Container, Stack } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNotificationContext } from "../../../context/notification/util.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components/loading";
import { ErrorInfo } from "../../../components/error-info";
import { getService, updateService } from "../../../api/service.ts";
import { ServiceFormValues, ServiceStatus } from "../../../types/service.ts";
import { serviceFormSchema } from "../../../components/service-form/util.ts";
import { ServiceForm } from "../../../components/service-form";
import { ServiceDetails } from "../../../components/service-form/service-details.tsx";
import { CreateServiceHeading } from "../../../components/service-heading/CreateServiceHeading.tsx";

export const EditServiceScreen = () => {
  const [showReview, setShowReview] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { serviceId = "" } = useParams();
  const {
    data: service,
    isLoading,
    isError: isGetServiceError,
    error: fetchServiceError,
  } = useQuery({
    queryKey: ["edit-service-details", serviceId],
    queryFn: () => getService(serviceId),
    enabled: !!serviceId,
  });

  const initialValues = useMemo(() => {
    return {
      title: service?.title || "",
      weight: service?.weight,
      price_per_kg: service?.price_per_kg,
      status: service?.status || ServiceStatus.Draft,
      arrival_city: service?.arrival_city || "",
      arrival_country: service?.arrival_country || "",
      arrival_date: service?.arrival_date || "",
      currency: service?.currency || "USD",
      departure_city: service?.departure_city || "",
      departure_country: service?.departure_country || "",
      departure_date: service?.departure_date || "",
      phone: service?.phone || "",
      transport_type: service?.transport_type || null,
      delivery_note: service?.delivery_note || "",
    };
  }, [service]);

  const methods = useForm<ServiceFormValues>({
    resolver: yupResolver(serviceFormSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ServiceFormValues) =>
      updateService(serviceId, payload),
    onSuccess: () => {
      setErrorMessage("");
      openNotification("Service saved for later successfully");
      navigate("/services");
    },
    onError: (data) => {
      setShowReview(false);
      setErrorMessage(data.message || "");
    },
  });

  const onSubmit: SubmitHandler<ServiceFormValues> = (data) => {
    mutate(data);
  };

  const handleShowReview = async () => {
    setErrorMessage("");
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

  if (isGetServiceError) {
    return <ErrorInfo message={fetchServiceError?.message} />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Stack gap={{ xs: 2, lg: 3 }}>
          <CreateServiceHeading
            showReview={showReview}
            onSetShowReview={handleShowReview}
            onBack={() => {
              setErrorMessage("");
              setShowReview(false);
            }}
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
            {showReview ? <ServiceDetails /> : <ServiceForm />}
          </Container>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default EditServiceScreen;
