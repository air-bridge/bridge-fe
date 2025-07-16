import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
  Theme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePasswordValidationSchema } from "../profile-form/validation.ts";
import { useMutation } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordStrengthBar from "react-password-strength-bar";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { setNewPassword } from "../../api/auth.ts";
import { SetPasswordFormValues } from "../../types/auth.ts";
import { useNotificationContext } from "../../context/notification/util.ts";

type Props = {
  email: string;
};
export const SetNewPassword = ({ email }: Props) => {
  const theme = useTheme();
  const { openNotification } = useNotificationContext();
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );

  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SetPasswordFormValues>({
    resolver: yupResolver(updatePasswordValidationSchema),
    defaultValues: {
      email,
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: setNewPassword,
    onSuccess: () => {
      openNotification("Password changed successfully.");
      reset();
    },
  });

  const onSubmit = (values: SetPasswordFormValues) => {
    mutate(values);
  };

  const handleShowPassword = () => setIsPasswordVisible(!isPasswordVisible);
  const handleShowConfirmPassword = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  const handleShowCurrentPassword = () =>
    setIsCurrentPasswordVisible(!isCurrentPasswordVisible);

  const passwordValue = watch("new_password");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 3 }}>
          <Stack gap={3}>
            <Stack gap={1.5}>
              <Typography variant="subtitle2">Update Password</Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your current password to make update
              </Typography>
            </Stack>

            {!isMobile && (
              <Box>
                <Button
                  data-testid="lg-button"
                  variant="contained"
                  disabled={isPending}
                  loading={isPending}
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
          <Grid container spacing={0.5}>
            {isError && (
              <Grid size={{ xs: 12 }}>
                <Alert severity="error" variant="filled">
                  {error?.message}
                </Alert>
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="currentPassword" size="small">
                Current Password
              </InputLabel>
              <Controller
                name="current_password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type={isCurrentPasswordVisible ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Current Password"
                    error={Boolean(errors.current_password)}
                    helperText={errors.current_password?.message}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              data-testid="toggle-current-password-visibility"
                              aria-label={
                                isConfirmPasswordVisible
                                  ? "hide the password"
                                  : "display the password"
                              }
                              onClick={handleShowCurrentPassword}
                              edge="end"
                            >
                              {isConfirmPasswordVisible ? (
                                <Visibility fontSize="small" />
                              ) : (
                                <VisibilityOff
                                  fontSize="small"
                                  color="disabled"
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Stack gap={1}>
                <InputLabel htmlFor="password" size="small">
                  New Password
                </InputLabel>
                <Controller
                  name="new_password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      type={isPasswordVisible ? "text" : "password"}
                      name="new_password"
                      placeholder="New Password"
                      error={Boolean(errors.new_password)}
                      helperText={errors.new_password?.message}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                data-testid="toggle-password-visibility"
                                aria-label={
                                  isPasswordVisible
                                    ? "hide the password"
                                    : "display the password"
                                }
                                onClick={handleShowPassword}
                                edge="end"
                              >
                                {isPasswordVisible ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff color="disabled" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
                <PasswordStrengthBar
                  password={passwordValue}
                  minLength={1}
                  shortScoreWord=""
                  scoreWordStyle={{
                    textTransform: "capitalize",
                    fontSize: theme.typography.caption.fontSize,
                  }}
                  scoreWords={["Weak", "Fair", "Good", "Strong", "Very Strong"]}
                />
                <Typography color="text.secondary" variant="body2">
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols.
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="confirmPassword" size="small">
                Repeat New Password
              </InputLabel>
              <Controller
                name="confirm_new_password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repeat New Password"
                    error={Boolean(errors.confirm_new_password)}
                    helperText={errors.confirm_new_password?.message}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              data-testid="toggle-confirm-password-visibility"
                              aria-label={
                                isConfirmPasswordVisible
                                  ? "hide the password"
                                  : "display the password"
                              }
                              onClick={handleShowConfirmPassword}
                              edge="end"
                            >
                              {isConfirmPasswordVisible ? (
                                <Visibility fontSize="small" />
                              ) : (
                                <VisibilityOff
                                  fontSize="small"
                                  color="disabled"
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
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
                  loading={isPending}
                  type="submit"
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  sx={{ mt: 2 }}
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
