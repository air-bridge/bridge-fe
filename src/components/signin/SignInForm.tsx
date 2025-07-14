import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormValues } from "../../types/auth.ts";
import { validationSchema } from "./validation.ts";
import { Link, useNavigate } from "react-router-dom";
import { setUserAuth } from "../../utils/userAuth.ts";
import { login } from "../../api/auth.ts";
import { ErrorCodes } from "./constant.ts";
import { useRegistrationContext } from "../../context/registration/util.ts";
import { SocialMediaAuth } from "./SocialMediaAuth.tsx";

type Props = {
  handleVerifyStatus: (status: boolean) => void;
};
export const SignInForm = ({ handleVerifyStatus }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setRegistrationInfo } = useRegistrationContext();

  const navigate = useNavigate();

  const handleShowPassword = () => setIsPasswordVisible(!isPasswordVisible);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUserAuth(data.data);
      navigate("/");
    },
  });

  const onSubmit = (payload: LoginFormValues) => {
    mutate(payload);
  };

  const emailWatch = watch("email");

  useEffect(() => {
    if (error?.message === ErrorCodes.EMAIL_NOT_VERIFIED) {
      handleVerifyStatus(true);
      setRegistrationInfo({ email: emailWatch });
    }
  }, [error, emailWatch]);

  const isLoading = isSubmitting || isPending;

  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <Typography variant="h2" color="primary" textAlign="center">
          Sign In
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Please provide your correct details to login to your account
        </Typography>
      </Stack>

      <SocialMediaAuth />

      <Box sx={{ display: "flex", alignItems: "center" }} my={1.5}>
        <Divider sx={{ flex: 1, borderColor: "divider" }} />
        <Typography variant="body2" px={2} color="text.secondary">
          Or with Email
        </Typography>
        <Divider sx={{ flex: 1, borderColor: "divider" }} />
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Grid container spacing={3}>
          {isError && (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error" variant="filled">
                {error?.message}
              </Alert>
            </Grid>
          )}
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
                  autoComplete="off"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
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
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
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
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              loadingIndicator={<CircularProgress color="inherit" size={16} />}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box
        component={Link}
        to="/auth/forgot-password"
        sx={{ textAlign: "right" }}
      >
        Forgot password?
      </Box>
    </Stack>
  );
};
