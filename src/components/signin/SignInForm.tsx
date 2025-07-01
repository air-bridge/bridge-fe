import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormValues } from "../../types/auth.ts";
import { validationSchema } from "./validation.ts";
import { useNavigate } from "react-router-dom";
import { setUserAuth } from "../../utils/userAuth.ts";
import { login } from "../../api/auth.ts";

export const SignInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => setIsPasswordVisible(!isPasswordVisible);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const isLoading = isSubmitting || isPending;

  return (
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
  );
};
