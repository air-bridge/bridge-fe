import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { getAuthUser } from "../../utils/userAuth.ts";
import { Header } from "../header";

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
    <>
      <Header />
      <Box py={2} px={{ xs: 2, lg: 5 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;
