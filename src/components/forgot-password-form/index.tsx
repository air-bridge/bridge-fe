import Grid from "@mui/material/Grid2";
import { Alert, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordFormValues } from "../../types/auth.ts";
import { validationSchema } from "./validation.ts";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/auth.ts";

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
    mutationFn: resetPassword,
    onSuccess: () => {
      onNext();
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    mutate(values);
  };

  return (
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
  );
};
