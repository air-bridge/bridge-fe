import type { Components, Theme } from "@mui/material/styles";

const DialogContent: Components<Theme>["MuiDialogContent"] = {
  styleOverrides: {
    root: () => ({
      padding: "16px",
      "@media (min-width: 1200px)": {
        padding: "32px",
      },
    }),
  },
};

export default DialogContent;
