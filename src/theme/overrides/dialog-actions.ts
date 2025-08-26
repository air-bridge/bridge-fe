import type { Components, Theme } from "@mui/material/styles";

const DialogActions: Components<Theme>["MuiDialogActions"] = {
  styleOverrides: {
    root: () => ({
      padding: "16px",
      "@media (min-width: 1200px)": {
        padding: "16px 24px 32px",
      },
    }),
  },
};

export default DialogActions;
