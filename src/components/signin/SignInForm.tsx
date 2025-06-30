import { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
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
import { useRegistrationContext } from "../../context/registration/util.ts";
import { useNavigate } from "react-router-dom";
import { setUserAuth } from "../../utils/userAuth.ts";

export const SignInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setRegistrationInfo } = useRegistrationContext();
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

  const onSubmit = (payload: LoginFormValues) => {
    setRegistrationInfo({
      ...payload,
    });

    // TODO: remove after integration
    setUserAuth({
      ...payload,
      firstName: "string",
      lastName: "string",
      phoneNumber: "string",
      country: "string",
      state: "string",
      confirmPassword: "",
      accountType: "",
    });

    navigate("/");
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
            disabled={isSubmitting}
            loading={isSubmitting}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
