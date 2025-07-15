import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid2,
  Stack,
  Switch,
  Theme,
  Typography,
} from "@mui/material";
import { NotificationsFormValues } from "../../types/user.ts";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import { setNotifications } from "../../api/user.ts";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNotificationContext } from "../../context/notification/util.ts";

export const NotificationsSetting = () => {
  const { openNotification } = useNotificationContext();
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const { control, handleSubmit, watch } = useForm<NotificationsFormValues>({
    defaultValues: {
      inApp: true,
      email: true,
      sms: false,
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: setNotifications,
    onSuccess: () => {
      openNotification("Changes saved successfully.");
    },
  });

  const onSubmit = (values: NotificationsFormValues) => {
    mutate(values);
  };

  const inAppWatch = watch("inApp");
  const emailWatch = watch("email");
  const smsWatch = watch("sms");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 3 }}>
          <Stack gap={3}>
            <Stack gap={1.5}>
              <Typography variant="subtitle2">Notification</Typography>
              <Typography variant="body2" color="text.secondary">
                Set up notifications for your account
              </Typography>
            </Stack>

            {!isMobile && (
              <Box>
                <Button
                  variant="contained"
                  disabled={isPending}
                  loading={isPending}
                  data-testid="lg-button"
                  type="submit"
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                >
                  Save changes
                </Button>
              </Box>
            )}
          </Stack>
        </Grid2>

        <Grid2
          size={{ xs: 12, lg: 7 }}
          offset={{ xs: 0, lg: 2 }}
          order={{ xs: 1, lg: 2 }}
        >
          <Grid container spacing={1.5}>
            {isError && (
              <Grid size={{ xs: 12 }}>
                <Alert severity="error" variant="filled">
                  {error?.message}
                </Alert>
              </Grid>
            )}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Controller
                name="inApp"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Switch checked={Boolean(inAppWatch)} />}
                    label={
                      <Typography sx={{ minWidth: isMobile ? 200 : 400 }}>
                        In app Notification
                      </Typography>
                    }
                    labelPlacement="start"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Switch checked={Boolean(emailWatch)} />}
                    label={
                      <Typography sx={{ minWidth: isMobile ? 200 : 400 }}>
                        Email Notification
                      </Typography>
                    }
                    labelPlacement="start"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="sms"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Switch checked={Boolean(smsWatch)} />}
                    label={
                      <Typography sx={{ minWidth: isMobile ? 200 : 400 }}>
                        SMS Notification
                      </Typography>
                    }
                    labelPlacement="start"
                  />
                )}
              />
            </Grid>

            {isMobile && (
              <Grid size={{ xs: 12 }}>
                <Button
                  data-testid="mobile-button"
                  variant="contained"
                  disabled={isPending}
                  type="submit"
                  loading={isPending}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  sx={{ mt: 1 }}
                >
                  Save changes
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid2>
      </Grid2>
    </form>
  );
};
