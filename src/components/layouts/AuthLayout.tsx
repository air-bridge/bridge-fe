import { Link, Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import logo from "../../assets/images/logo.png";

const AuthLayout = () => {
  return (
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
        <Outlet />
      </Box>
    </Stack>
  );
};

export default AuthLayout;
