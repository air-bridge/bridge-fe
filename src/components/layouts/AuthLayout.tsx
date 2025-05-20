import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const AuthLayout = () => {
  return (
    <Box>
      <Typography>AuthLayout</Typography>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
