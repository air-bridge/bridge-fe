import { Button, Stack, SvgIcon, Theme, Typography } from "@mui/material";
import { Apple } from "@mui/icons-material";
import GoogleIconSvg from "../../assets/icons/google.svg?react";
import useMediaQuery from "@mui/material/useMediaQuery";

export const SocialMediaAuth = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );

  return (
    <Stack direction="row" justifyContent="center" gap={{ xs: 1, lg: 3 }}>
      <Button
        variant="outlined"
        color="secondary"
        size={isMobile ? "medium" : "large"}
        startIcon={<SvgIcon component={GoogleIconSvg} />}
      >
        <Typography sx={{ color: "text.primary" }}>
          Sign up with Google
        </Typography>
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        size={isMobile ? "medium" : "large"}
        startIcon={<Apple sx={{ color: "text.primary" }} />}
      >
        <Typography sx={{ color: "text.primary" }}>
          Sign up with Apple
        </Typography>
      </Button>
    </Stack>
  );
};
