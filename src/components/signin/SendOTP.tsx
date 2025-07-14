import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../../api/auth.ts";
import { useRegistrationContext } from "../../context/registration/util.ts";

type Props = {
  onNext: () => void;
};
export const SendOTP = ({ onNext }: Props) => {
  const { payload } = useRegistrationContext();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: sendOTP,
    onSuccess: () => {
      onNext();
    },
  });

  const handleSendOtp = () => {
    void mutate(payload.email);
  };

  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <Typography variant="h2" color="primary" textAlign="center">
          Unverified Account
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Please verify your account to gain full access to your account
        </Typography>
      </Stack>

      {isError && (
        <Alert severity="error" variant="filled">
          {error?.message}
        </Alert>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={handleSendOtp}
        disabled={isPending}
        loading={isPending}
        loadingIndicator={<CircularProgress color="inherit" size={16} />}
      >
        Send OTP
      </Button>
    </Stack>
  );
};
