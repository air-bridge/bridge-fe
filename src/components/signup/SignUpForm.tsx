import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import Grid from "@mui/material/Grid2";
import {
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationFormValues } from "../../types/auth.ts";
import useTheme from "@mui/material/styles/useTheme";
import { validationSchema } from "./validation.ts";
import { useRegistrationContext } from "../../context/registration/util.ts";

type Props = {
  onNext: () => void;
};
export const SignUpForm = ({ onNext }: Props) => {
  const theme = useTheme();
  const { payload, setRegistrationInfo } = useRegistrationContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleShowPassword = () => setIsPasswordVisible(!isPasswordVisible);
  const handleShowConfirmPassword = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      terms: false,
      email: payload.email || "",
      password: payload.password || "",
      confirmPassword: payload.confirmPassword || "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = (values: RegistrationFormValues) => {
    setRegistrationInfo(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                name="email"
                placeholder="Email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                autoComplete="off"
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Stack gap={1}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={isPasswordVisible ? "text" : "password"}
                  fullWidth
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
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
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
        <Grid size={{ xs: 12 }} sx={{ pl: 1 }}>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox color="info" />}
                label={
                  <Typography variant="body2">
                    By clicking signup, you agree to Airbridge&nbsp;
                    <Link to="/">terms & condition policy</Link>
                  </Typography>
                }
              />
            )}
          />

          {errors.terms && (
            <FormHelperText error>{errors.terms?.message}</FormHelperText>
          )}
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            Sign Up 12
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
