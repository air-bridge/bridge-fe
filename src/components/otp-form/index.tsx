import { useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import Grid from "@mui/material/Grid2";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileIcon from "@mui/icons-material/PhoneAndroid";
import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../../api/auth.ts";
import { getAuthUser } from "../../utils/userAuth.ts";
import { shadowEmailString } from "../../utils/string.ts";

type Props = {
  email?: string;
  onNext: () => void;
};
export const OTPForm = ({ email, onNext }: Props) => {
  const userAuth = getAuthUser();
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      onNext();
    },
  });

  const handleOtp = () => {
    mutate(otp.join(""));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const userEmail = email || userAuth?.email;

  return (
    <Stack
      gap={{ xs: 2, lg: 3 }}
      alignItems="center"
      sx={{ width: { xs: "90%", lg: 400 }, m: "auto" }}
    >
      <MobileIcon sx={{ fontSize: "64px" }} />
      <Box>
        <Typography variant="h1" textAlign="center">
          OTP Verification ?
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary">
          Enter the verification code we sent to
        </Typography>
      </Box>

      {userEmail && (
        <Typography variant="h3" textAlign="center" data-testid="user-email">
          {shadowEmailString(userEmail)}
        </Typography>
      )}

      <Typography variant="subtitle2" textAlign="center">
        Type you 6 digit security code
      </Typography>

      <Stack gap={2}>
        <Grid container spacing={2}>
          {isError && (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error" variant="filled">
                {error?.message}
              </Alert>
            </Grid>
          )}
          <Grid size={{ xs: 12 }}>
            <Box display="flex" gap={1}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  slotProps={{
                    htmlInput: {
                      maxLength: 1,
                      style: {
                        fontSize: "22px",
                        height: isMobile ? 55 : 62,
                        textAlign: "center",
                        fontWeight: 700,
                        padding: 0,
                      },
                      inputMode: "numeric",
                    },
                  }}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  variant="outlined"
                  size="medium"
                  sx={{
                    fieldset: {
                      borderRadius: 2,
                    },
                  }}
                />
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleOtp}
              disabled={isPending}
              loading={isPending}
              loadingIndicator={<CircularProgress color="inherit" size={16} />}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Stack direction="row" gap={0.5} justifyContent="center">
          <Typography variant="body1" color="text.secondary">
            Didn't get the code?
          </Typography>
          <Typography
            variant="body1"
            color="primary.main"
            sx={{ cursor: "pointer" }}
          >
            Resend
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
