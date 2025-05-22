import type { Components, Theme } from "@mui/material/styles";

const DialogActions: Components<Theme>["MuiDialogActions"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: "16px",
      background: theme.palette.grey[100],
      "@media (min-width: 1200px)": {
        padding: "16px",
      },
    }),
  },
};

export default DialogActions;
