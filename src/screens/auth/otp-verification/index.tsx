import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import { OTPForm } from "../../../components/otp-form";
import MobileIcon from "@mui/icons-material/PhoneAndroid";

const OTPVerificationScreen = () => {
  return (
    <Stack gap={{ xs: 4, lg: 10 }}>
      <Stack
        gap={0.5}
        direction="row"
        alignItems="center"
        component={Link}
        to="/auth"
        sx={{ color: "text.primary", "&:hover": { color: "text.primary" } }}
      >
        <WestIcon fontSize="small" />
        <Typography variant="body2">Back</Typography>
      </Stack>
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

        <Typography variant="h3" textAlign="center">
          mail****@gmail.com
        </Typography>

        <Box>
          <Typography variant="subtitle2" textAlign="center">
            Type you 6 digit security code
          </Typography>
        </Box>

        <Stack gap={2}>
          <OTPForm />

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
    </Stack>
  );
};

export default OTPVerificationScreen;
