import { Button, Stack, Typography } from "@mui/material";
import icon from "../../assets/images/profile-completed.png";
import { Link } from "react-router-dom";

export const ProfileSetupCompleted = () => {
  return (
    <Stack
      gap={{ xs: 2, lg: 3 }}
      sx={{ width: { xs: "90%", lg: 400 }, m: "auto" }}
    >
      <img src={icon} alt="icon" />
      <Stack gap={1}>
        <Typography variant="h3" textAlign="center">
          Profile Created
        </Typography>
        <Typography textAlign="center" variant="body2" color="text.secondary">
          You have Successfully created your account, dive in to start exploring
        </Typography>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        Start Exploring
      </Button>
    </Stack>
  );
};
