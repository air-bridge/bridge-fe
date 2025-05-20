import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PublicLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default PublicLayout;
