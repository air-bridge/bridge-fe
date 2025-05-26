import { Button, Stack, SvgIcon } from "@mui/material";
import { Apple } from "@mui/icons-material";
import GoogleIconSvg from "../../assets/icons/google.svg?react";

export const SocialMediaAuth = () => {
  return (
    <Stack direction="row" justifyContent="center" gap={3}>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        startIcon={<SvgIcon component={GoogleIconSvg} />}
      >
        Sign in with Google
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<Apple />}
      >
        Sign in with Apple
      </Button>
    </Stack>
  );
};
