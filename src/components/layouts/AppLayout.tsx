import { Outlet, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
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
    <Stack gap={2}>
      <Header />
      <Box px={5}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default AppLayout;
