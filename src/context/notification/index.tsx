import { PropsWithChildren, useState } from "react";
import { AlertType, NotificationContext } from "./util.ts";
import { Alert, AlertProps } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

export const NotificationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertProps["severity"]>("success");

  const openNotification = (message: string, type = AlertType.SUCCESS) => {
    setSeverity(type);
    setOpen(true);
    setMessage(message);
  };

  return (
    <NotificationContext.Provider
      value={{
        openNotification,
        open,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
