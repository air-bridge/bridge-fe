import Grid from "@mui/material/Grid2";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { setNewPassword } from "../../api/auth.ts";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordStrengthBar from "react-password-strength-bar";
import { useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
import { Link } from "react-router-dom";
import { useRegistrationContext } from "../../context/registration/util.ts";
import { SetPasswordFormValues } from "../../types/auth.ts";
import { passwordValidationSchema } from "../profile-form/validation.ts";

type Props = {
  onNext: () => void;
};

export const SetPasswordForm = ({ onNext }: Props) => {
  const theme = useTheme();
  const { payload } = useRegistrationContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SetPasswordFormValues>({
    resolver: yupResolver(passwordValidationSchema),
    defaultValues: {
      email: payload.email,
      new_password: "",
      confirm_new_password: "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: setNewPassword,
    onSuccess: () => {
      onNext();
    },
  });

  const handleShowPassword = () => setIsPasswordVisible(!isPasswordVisible);
  const handleShowConfirmPassword = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const onSubmit = (values: SetPasswordFormValues) => {
    mutate(values);
  };

  const passwordValue = watch("new_password");

  return (
    <Stack gap={4}>
      <Box>
        <Typography variant="h3" textAlign="center">
          Setup New Password
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary">
          Have you already reset the password?{" "}
          <Link to="/account">Sign in</Link>
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {isError && (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error" variant="filled">
                {error?.message}
              </Alert>
            </Grid>
          )}

          <Grid size={{ xs: 12 }}>
            <Stack gap={1}>
              <Controller
                name="new_password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={isPasswordVisible ? "text" : "password"}
                    fullWidth
                    name="new_password"
                    placeholder="Password"
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
            <Controller
              name="confirm_new_password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  name="confirm_new_password"
                  placeholder="Repeat Password"
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
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isPending}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};
