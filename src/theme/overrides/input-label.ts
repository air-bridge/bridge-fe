import type { Components, Theme } from "@mui/material/styles";

const InputLabel: Components<Theme>["MuiInputLabel"] = {
  styleOverrides: {
    root: {
      color: "#394753",
      marginBottom: "5px",
      fontSize: "12px",
      "@media (min-width: 1200px)": {
        fontSize: "0.85rem",
      },
    },
  },
};

export default InputLabel;
