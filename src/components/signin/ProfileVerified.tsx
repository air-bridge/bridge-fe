import { Button, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import animationJson from "../../assets/animation/profile.json";

type Props = {
  onNext: () => void;
};
export const ProfileVerified = ({ onNext }: Props) => {
  return (
    <Stack
      gap={{ xs: 2, lg: 3 }}
      sx={{ width: { xs: "90%", lg: 400 }, m: "auto" }}
    >
      <Lottie loop={false} animationData={animationJson} />
      <Stack gap={1}>
        <Typography variant="h3" textAlign="center">
          Profile Verified
        </Typography>
        <Typography textAlign="center" variant="body2" color="text.secondary">
          You have successfully verify your account, dive in to start exploring
        </Typography>
      </Stack>

      <Button fullWidth variant="contained" color="primary" onClick={onNext}>
        Start Exploring
      </Button>
    </Stack>
  );
};
