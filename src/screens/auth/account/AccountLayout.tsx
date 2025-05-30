import { Link } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import logo from "../../../assets/images/logo.png";
import logoWhite from "../../../assets/images/logo-white.png";
import { PropsWithChildren } from "react";

type Props = {
  showBackgroundImage: boolean;
} & PropsWithChildren;

export const AccountLayout = ({ showBackgroundImage, children }: Props) => {
  return showBackgroundImage ? (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      justifyContent={{ xs: "center", lg: "flex-end" }}
      alignItems={{ xs: "center", lg: "center" }}
      gap={{ xs: 2, lg: 15 }}
      sx={{
        height: "100vh",
        position: "relative",
        backgroundImage: 'url("/authBg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        px: { xs: 5, lg: 3 },
      }}
    >
      <Box
        component="img"
        src={logoWhite}
        alt="logo"
        sx={{ width: { xs: 200, lg: 250 } }}
      />

      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 1,
          borderRadius: { xs: 2, lg: 3 },
          width: { xs: "100%", lg: 580 },
          px: { xs: 3, lg: 7 },
          py: { xs: 3, lg: 5 },
        }}
      >
        {children}
      </Box>
    </Stack>
  ) : (
    <Stack
      alignItems={"center"}
      justifyContent="center"
      sx={{
        height: "100vh",
        position: "relative",
        display: { xs: "block", lg: "flex" },
      }}
    >
      <Box
        sx={{
          position: { xs: "static", lg: "absolute" },
          top: { xs: 10, lg: 25 },
          left: { xs: 10, lg: 25 },
          right: 0,
          p: { xs: 1.5, lg: 0 },
          bgcolor: "grey.100",
        }}
      >
        <Link to="/">
          <img src={logo} alt="logo" width={160} />
        </Link>
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 1,
          borderRadius: { xs: 0, lg: 3 },
          width: { xs: "100%", lg: 580 },
          height: { xs: "100%", lg: "auto" },
          px: { xs: 3, lg: 7 },
          py: { xs: 3, lg: 5 },
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
