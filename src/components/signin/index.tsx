import { Box, Divider, Stack, Typography } from "@mui/material";
import { SocialMediaAuth } from "./SocialMediaAuth.tsx";
import { SignInForm } from "./SignInForm.tsx";
import { Link } from "react-router-dom";

type Props = {
  onChange: () => void;
};
export const SignIn = ({ onChange }: Props) => {
  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <Typography variant="h2" color="primary" textAlign="center">
          Sign In
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Please provide your correct details to login to your account
        </Typography>
      </Stack>

      <SocialMediaAuth />

      <Box sx={{ display: "flex", alignItems: "center" }} my={1.5}>
        <Divider sx={{ flex: 1, borderColor: "divider" }} />
        <Typography variant="body2" px={2} color="text.secondary">
          Or with Email
        </Typography>
        <Divider sx={{ flex: 1, borderColor: "divider" }} />
      </Box>

      <SignInForm />

      <Typography variant="body1" color="text.secondary" textAlign="center">
        Not a member yet?&nbsp;
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            onChange();
          }}
        >
          Sign Up
        </Link>
      </Typography>
    </Stack>
  );
};
