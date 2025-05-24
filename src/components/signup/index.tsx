import { Box, Divider, Stack, Typography } from "@mui/material";
import { SocialMediaAuth } from "./SocialMediaAuth.tsx";
import { SignUpForm } from "./SignUpForm.tsx";
import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <Typography variant="h2" color="primary" textAlign="center">
          Sign Up
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Please provide your correct details to create your account
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

      <SignUpForm />

      <Typography variant="body1" color="text.secondary" textAlign="center">
        Already have an Account?&nbsp;
        <Link to="/">Sign in</Link>
      </Typography>
    </Stack>
  );
};
