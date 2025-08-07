import type { Components, Theme } from "@mui/material/styles";

const Dialog: Components<Theme>["MuiDialog"] = {
  styleOverrides: {
    root: () => ({
      "& .MuiPaper-root": {
        borderRadius: "16px",
      },
    }),
  },
};

export default Dialog;
