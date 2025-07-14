import { createContext, useContext } from "react";
import { AlertColor } from "@mui/material/Alert/Alert";

type Props = {
  open: boolean;
  openNotification: (message: string, alertType?: AlertColor) => void;
};

export const NotificationContext = createContext<Props>({
  openNotification: () => {},
  open: false,
});

export const useNotificationContext = () => useContext(NotificationContext);

export const AlertType: Record<string, AlertColor> = {
  SUCCESS: "success",
  ERROR: "error",
};
