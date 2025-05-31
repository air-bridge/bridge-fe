import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { getAuthUser } from "../../utils/userAuth.ts";

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = getAuthUser();
    if (!authUser) {
      void navigate("/account");
      return;
    }
  }, []);

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AppLayout;
