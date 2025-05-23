import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const AppLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AppLayout;
