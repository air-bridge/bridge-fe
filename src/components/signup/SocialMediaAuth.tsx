import { Button, Stack, SvgIcon, Theme } from "@mui/material";
import { Apple } from "@mui/icons-material";
import GoogleIconSvg from "../../assets/icons/google.svg?react";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  mobile?: boolean;
};

export const SocialMediaAuth = ({ mobile }: Props) => {
  const isMobile =
    mobile || useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"));

  return (
    <Stack direction="row" justifyContent="center" gap={{ xs: 1, lg: 3 }}>
      <Button
        variant="outlined"
        color="secondary"
        size={isMobile ? "medium" : "large"}
        startIcon={<SvgIcon component={GoogleIconSvg} />}
      >
        Sign up with Google
      </Button>

      <Button
        variant="outlined"
        color="inherit"
        size={isMobile ? "medium" : "large"}
        startIcon={<Apple sx={{ color: "text.primary" }} />}
      >
        Sign up with Apple
      </Button>
    </Stack>
  );
};
