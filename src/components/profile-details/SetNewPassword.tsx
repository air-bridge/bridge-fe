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
import { SetNewPasswordValues } from "../../types/user.ts";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordValidationSchema } from "../profile-form/validation.ts";
import { useMutation } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import { setNewPassword } from "../../api/user.ts";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordStrengthBar from "react-password-strength-bar";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

export const SetNewPassword = () => {
  const theme = useTheme();
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
  } = useForm<SetNewPasswordValues>({
    resolver: yupResolver(passwordValidationSchema()),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: setNewPassword,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit = (values: SetNewPasswordValues) => {
    mutate(values);
  };

  const handleShowPassword = () => setIsPasswordVisible(!isPasswordVisible);
  const handleShowConfirmPassword = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  const handleShowCurrentPassword = () =>
    setIsCurrentPasswordVisible(!isCurrentPasswordVisible);

  const passwordValue = watch("password");

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
                name="currentPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type={isCurrentPasswordVisible ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Current Password"
                    error={Boolean(errors.currentPassword)}
                    helperText={errors.currentPassword?.message}
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
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={isPasswordVisible ? "text" : "password"}
                      fullWidth
                      size="small"
                      name="password"
                      placeholder="Password"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
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
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repeat Password"
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
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
