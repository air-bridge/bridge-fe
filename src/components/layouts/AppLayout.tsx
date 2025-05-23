import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect } from "react";

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: check if user is logged in
    navigate("/auth/account");
  }, []);

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AppLayout;
