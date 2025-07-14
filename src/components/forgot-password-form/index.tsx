import Grid from "@mui/material/Grid2";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordFormValues } from "../../types/auth.ts";
import { validationSchema } from "./validation.ts";
import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../../api/auth.ts";
import { Link } from "react-router-dom";

type Props = {
  onNext: () => void;
};
export const ForgotPasswordForm = ({ onNext }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(validationSchema()),
    defaultValues: { email: "" },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: sendOTP,
    onSuccess: () => {
      onNext();
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    mutate(values.email);
  };

  return (
    <>
      <Box>
        <Typography variant="h3" textAlign="center">
          Forgot Password ?
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary">
          Enter your email to reset your password
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
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  name="email"
                  placeholder="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
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

      <Button
        fullWidth
        component={Link}
        to="/account"
        variant="text"
        color="secondary"
      >
        Back
      </Button>
    </>
  );
};
