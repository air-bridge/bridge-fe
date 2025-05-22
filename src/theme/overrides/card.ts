import type { Components, Theme } from "@mui/material/styles";

const Card: Components<Theme>["MuiCard"] = {
  styleOverrides: {
    root: {
      "&.MuiCard-root": {
        borderRadius: "14px",
        border: "solid 1px #F7F7F7",
      },
    },
  },
};

export default Card;
