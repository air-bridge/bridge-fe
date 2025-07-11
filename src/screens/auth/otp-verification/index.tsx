import { Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import { OTPForm } from "../../../components/otp-form";

const OTPVerificationScreen = () => {
  const navigate = useNavigate();

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

      <OTPForm onNext={() => navigate("/")} />
    </Stack>
  );
};

export default OTPVerificationScreen;
