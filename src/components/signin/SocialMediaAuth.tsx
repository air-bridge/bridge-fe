import { Button, Stack, SvgIcon } from "@mui/material";
import { Apple } from "@mui/icons-material";
import GoogleIconSvg from "../../assets/icons/google.svg?react";

export const SocialMediaAuth = () => {
  return (
    <Stack direction="row" justifyContent="center" gap={{ xs: 1, lg: 3 }}>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<SvgIcon component={GoogleIconSvg} />}
      >
        Sign in with Google
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        startIcon={<Apple sx={{ color: "text.primary" }} />}
      >
        Sign in with Apple
      </Button>
    </Stack>
  );
};
