import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  InputLabel,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { OrderDetailsHeading } from "../../../components/order-heading/OrderDetailsHeading.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { findMatching, getOrder } from "../../../api/order.ts";
import { Loading } from "../../../components/loading";
import { ErrorInfo } from "../../../components/error-info";
import { OrderDetails } from "../../../components/order-details";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { MatchTrigger } from "../../../components/match-trigger";
import { yupResolver } from "@hookform/resolvers/yup";
import { MatchServicePayload } from "../../../types/service.ts";
import * as yup from "yup";
import { string } from "yup";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2";
import { DatePicker } from "@mui/x-date-pickers";
import { OrderStatus } from "../../../types/order.ts";

const schema: yup.ObjectSchema<MatchServicePayload> = yup.object({
  start_date: string().required("Start date is required"),
  end_date: string()
    .required("End date is required")
    .test(
      "is-valid-range",
      "End date should be after start date",
      function (value: string) {
        if (this.parent.start_date) {
          return dayjs(this.parent.start_date).isBefore(dayjs(value), "date");
        }
      },
    ),
});

const initialValues = {
  start_date: "",
  end_date: "",
};

export const OrderDetailsScreen = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openMatchBanner, setOpenMatchBanner] = useState(false);
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const { orderId = "" } = useParams();

  const methods = useForm<MatchServicePayload>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const closeDrawer = () => {
    setOpen(false);
  };
  const closeMatchDrawer = () => {
    setOpenMatchBanner(false);
  };

  const handleCloseDrawer = (_: unknown, reason: string) => {
    if (reason === "backdropClick") return;

    closeDrawer();
  };

  const handleCloseMatchDrawer = (_: unknown, reason: string) => {
    if (reason === "backdropClick") return;

    closeMatchDrawer();
  };

  const openDrawer = () => {
    setOpen(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: MatchServicePayload) =>
      findMatching(orderId, payload.start_date, payload.end_date),
    onSuccess: (data) => {
      if (data.total_matches > 0) {
        setErrorMessage("");
        setOpen(false);
        setOpenMatchBanner(true);
      } else {
        setErrorMessage("There are no active service within the date range");
      }
    },
    onError: (data) => {
      setErrorMessage(data.message);
    },
  });

  const customSetInputValue = (
    name: keyof MatchServicePayload,
    value: string,
  ) => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<MatchServicePayload> = (data) => {
    mutate(data);
  };

  const start_date = watch("start_date");
  const end_date = watch("end_date");
  const showAction = !isError && !isLoading;
  const isActive = data?.status === OrderStatus.Active;

  return (
    <>
      <Stack gap={{ xs: 2, lg: 3 }}>
        <OrderDetailsHeading
          showAction={showAction}
          onOpen={openDrawer}
          status={data?.status}
          orderId={data?.id}
        />

        <Container
          sx={{
            maxWidth: { xs: "100%", lg: "620px" },
            px: { xs: 2, lg: 0 },
            py: 3,
            pt: { xs: 0, lg: "100px" },
          }}
        >
          <Stack gap={2}>
            {isError && <ErrorInfo message={error?.message} />}
            {isLoading && <Loading />}
            {data && <OrderDetails data={data} />}

            {isMobile && showAction && (
              <Stack gap={2}>
                {isActive && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={openDrawer}
                  >
                    Check Availability
                  </Button>
                )}

                <Button
                  variant={isActive ? "outlined" : "contained"}
                  color="primary"
                  fullWidth
                  component={Link}
                  to={`/orders/edit/${orderId}`}
                >
                  Edit
                </Button>
              </Stack>
            )}
          </Stack>
        </Container>
      </Stack>

      <Dialog open={open} onClose={handleCloseDrawer}>
        <DialogTitle sx={{ textAlign: "right" }}>
          <Stack
            gap={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Find Match</Typography>

            <CloseIcon onClick={closeDrawer} sx={{ color: "text.secondary" }} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack gap={1}>
            {errorMessage && (
              <Alert severity="error" variant="filled">
                {errorMessage}
              </Alert>
            )}
            <Typography textAlign="center" py={2} color="text.secondary">
              Select a suitable date range you want your order to be delivered
            </Typography>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={{ xs: 1, lg: 2 }}>
                  <Grid size={{ xs: 12 }}>
                    <Controller
                      name="start_date"
                      control={control}
                      render={({ field }) => (
                        <Box>
                          <InputLabel htmlFor="start_date">
                            Start date
                          </InputLabel>
                          <Controller
                            {...field}
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                {...field}
                                value={start_date ? dayjs(start_date) : null}
                                sx={{
                                  width: "100%",
                                }}
                                format="YYYY-MM-DD"
                                disablePast
                                onChange={(date) => {
                                  customSetInputValue(
                                    "start_date",
                                    dayjs(date).format("YYYY-MM-DD"),
                                  );
                                }}
                              />
                            )}
                          />
                          {errors.start_date && (
                            <FormHelperText error>
                              {errors.start_date?.message}
                            </FormHelperText>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Controller
                      name="end_date"
                      control={control}
                      render={({ field }) => (
                        <Box>
                          <InputLabel htmlFor="start_date">End Date</InputLabel>
                          <Controller
                            {...field}
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                {...field}
                                value={end_date ? dayjs(end_date) : null}
                                sx={{
                                  width: "100%",
                                }}
                                format="YYYY-MM-DD"
                                disablePast
                                onChange={(date) => {
                                  customSetInputValue(
                                    "end_date",
                                    dayjs(date).format("YYYY-MM-DD"),
                                  );
                                }}
                              />
                            )}
                          />
                          {errors.end_date && (
                            <FormHelperText error>
                              {errors.end_date?.message}
                            </FormHelperText>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    loading={isPending}
                    loadingIndicator={<CircularProgress />}
                  >
                    Search
                  </Button>
                </Grid>
              </form>
            </FormProvider>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openMatchBanner}
        onClose={handleCloseMatchDrawer}
        disableEscapeKeyDown
      >
        <DialogContent
          sx={{
            bgcolor: "black",
            px: { xs: 3, lg: 10 },
            pt: { xs: 2, lg: 6 },
            pb: { xs: 5, lg: 6 },
          }}
        >
          {isMobile && (
            <Box sx={{ textAlign: "right" }}>
              <IconButton onClick={closeMatchDrawer}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          )}
          <MatchTrigger onClose={closeMatchDrawer} />
        </DialogContent>
      </Dialog>
    </>
  );
};
