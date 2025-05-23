import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";

const AuthLayout = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh", display: { xs: "block", lg: "flex" } }}
    >
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 1,
          borderRadius: { xs: 0, lg: 3 },
          minHeight: { xs: "100%", lg: 600 },
          width: { xs: "100%", lg: 680 },
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
