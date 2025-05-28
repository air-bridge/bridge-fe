import type { Components, Theme } from "@mui/material/styles";

const Link: Components<Theme>["MuiLink"] = {
  styleOverrides: {
    root: {
      "&.MuiLink-root": {
        textDecoration: "none",
      },
    },
  },
};

export default Link;
