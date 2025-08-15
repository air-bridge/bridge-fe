import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
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
import Lottie from "lottie-react";
import animationJson from "../../../assets/animation/plane.json";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const methods = useForm<ServiceFormValues>({
    resolver: yupResolver(serviceFormSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      setErrorMessage("");
      if (showReview) {
        setOpenSuccess(true);
      } else {
        openNotification("Service saved for later successfully");
        navigate("/");
      }
    },
    onError: (data) => {
      setShowReview(false);
      setErrorMessage(data.message);
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
    setErrorMessage("");
    const isValidForm = await methods.trigger();
    if (isValidForm) {
      setShowReview(true);
    }
  };

  return (
    <>
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
              {showReview ? <OrderDetails /> : <ServiceForm />}
            </Container>
          </Stack>
        </form>
      </FormProvider>

      {/* Success info Dialog */}
      <Dialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        disableEscapeKeyDown
        fullScreen={isMobile}
      >
        <DialogContent
          sx={{
            borderBottom: "solid 1px",
            borderBottomColor: "divider",
            maxWidth: { xs: "100%", lg: 400 },
          }}
        >
          <Stack alignItems="center" justifyContent="center" gap={2}>
            <Lottie
              loop
              animationData={animationJson}
              style={{ width: 100, height: 100 }}
            />

            <Typography variant="h4" textAlign="center">
              Service Created Successfully
            </Typography>
            <Typography textAlign="center" color="text.secondary">
              You have successfully created your service. You will be notified
              when requests are made on your service.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              setOpenSuccess(false);
              navigate("/");
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
