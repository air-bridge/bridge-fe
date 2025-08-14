import { Outlet, useNavigate, matchPath } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getAuthUser } from "../../utils/userAuth.ts";
import { Header } from "../header";
import { UserContextProvider } from "../../context/user";
import { NotificationContextProvider } from "../../context/notification";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const fullScreenPaths = [
  "create-order",
  "orders/:orderId",
  "edit-order/:orderId",
  "create-service",
  "requests/:serviceId",
  "edit-service/:serviceId",
];
const AppLayout = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();

  const isFullScreen = fullScreenPaths.some((path) =>
    matchPath({ path, end: true }, location.pathname),
  );

  useEffect(() => {
    const authUser = getAuthUser();
    if (!authUser) {
      void navigate("/account");
      return;
    } else {
      setIsAllowed(true);
    }
  }, []);

  return isAllowed ? (
    <NotificationContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserContextProvider>
          {isFullScreen ? (
            <Outlet />
          ) : (
            <>
              <Header />
              <Box py={{ xs: 2, lg: 3 }} px={{ xs: 2, lg: 5 }}>
                <Outlet />
              </Box>
            </>
          )}
        </UserContextProvider>
      </LocalizationProvider>
    </NotificationContextProvider>
  ) : null;
};

export default AppLayout;
