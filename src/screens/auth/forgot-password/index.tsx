import { Box, Button, Stack, Typography } from "@mui/material";
import { ForgotPasswordForm } from "../../../components/forgot-password-form";
import { Link } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";

const ForgotPasswordScreen = () => {
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
        sx={{ width: { xs: "90%", lg: 400 }, m: "auto" }}
      >
        <Box>
          <Typography variant="h3" textAlign="center">
            Forgot Password ?
          </Typography>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Enter your email to reset your password
          </Typography>
        </Box>

        <Stack gap={{ xs: 1, lg: 2 }}>
          <ForgotPasswordForm />

          <Button
            fullWidth
            component={Link}
            to="/auth"
            variant="text"
            color="secondary"
          >
            Back
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ForgotPasswordScreen;
