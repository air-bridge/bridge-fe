import { Box, Button, Stack, Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { ProfileForm } from "../profile-form";
import { AccountTabState } from "../signin/constant.ts";

type Props = {
  onNext: (arg: AccountTabState) => void;
};

export const ProfileSetup = ({ onNext }: Props) => {
  return (
    <Stack gap={{ xs: 4, lg: 10 }}>
      <Stack gap={0.5} direction="row" alignItems="center">
        <Button
          size="small"
          variant="text"
          color="inherit"
          startIcon={<WestIcon fontSize="small" />}
          onClick={() => onNext(AccountTabState.ACCOUNT_TYPE)}
        >
          Back
        </Button>
      </Stack>
      <Stack
        gap={{ xs: 2, lg: 3 }}
        sx={{ width: { xs: "90%", lg: 400 }, m: "auto" }}
      >
        <Box>
          <Typography variant="h3" textAlign="center">
            Profile Registration
          </Typography>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            We require your details to complete your account creation
          </Typography>
        </Box>

        <ProfileForm onNext={() => onNext(AccountTabState.OTP_VERIFICATION)} />
      </Stack>
    </Stack>
  );
};
