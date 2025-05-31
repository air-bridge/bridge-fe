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
} from "@mui/material";
import { CheckBox, Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
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

  const initialValues = {
    email: payload.email,
    password: payload.password,
    confirmPassword: payload.confirmPassword,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: RegistrationFormValues) => {
        setRegistrationInfo(values);
        onNext();
      }}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange={false}
    >
      {({ handleChange, handleSubmit, validateField, values, errors }) => (
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                autoComplete="off"
                onBlur={() => void validateField("email")}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Stack gap={1}>
                <TextField
                  type={isPasswordVisible ? "text" : "password"}
                  fullWidth
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  onBlur={() => void validateField("password")}
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
                <PasswordStrengthBar
                  password={values.password}
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
              <TextField
                fullWidth
                type={isConfirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Repeat Password"
                value={values.confirmPassword}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                onChange={handleChange}
                onBlur={() => void validateField("confirmPassword")}
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
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ pl: 1 }}>
              <FormControlLabel
                control={<CheckBox color="info" />}
                name="terms"
                label={
                  <Typography variant="body2">
                    By clicking signup, you agree to Airbridge&nbsp;
                    <Link to="/">terms & condition policy</Link>
                  </Typography>
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
