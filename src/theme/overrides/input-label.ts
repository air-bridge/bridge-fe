import type { Components, Theme } from "@mui/material/styles";

const InputLabel: Components<Theme>["MuiInputLabel"] = {
  styleOverrides: {
    root: {
      color: "#394753",
      marginBottom: "5px",
      fontSize: "0.85rem",
      fontWeight: 400,
    },
  },
};

export default InputLabel;
