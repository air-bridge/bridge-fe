import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { getAuthUser } from "../../utils/userAuth.ts";
import { Header } from "../header";
import { UserContextProvider } from "../../context/user";
import { NotificationContextProvider } from "../../context/notification";

const fullScreenPaths = ["create-order"];
const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isFullScreen = fullScreenPaths.includes(pathname.replace("/", ""));

  useEffect(() => {
    const authUser = getAuthUser();
    if (!authUser) {
      void navigate("/account");
      return;
    }
  }, []);

  return (
    <NotificationContextProvider>
      <UserContextProvider>
        {isFullScreen ? (
          <Outlet />
        ) : (
          <>
            <Header />
            <Box py={2} px={{ xs: 2, lg: 5 }}>
              <Outlet />
            </Box>
          </>
        )}
      </UserContextProvider>
    </NotificationContextProvider>
  );
};

export default AppLayout;
