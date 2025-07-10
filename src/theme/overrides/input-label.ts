import type { Components, Theme } from "@mui/material/styles";

const InputLabel: Components<Theme>["MuiInputLabel"] = {
  variants: [
    {
      props: { size: "small" },
      style: {
        "&.MuiFormLabel-root.MuiInputLabel-root": {
          fontSize: "0.8rem",
          marginBottom: "22px",
        },
      },
    },
  ],
  styleOverrides: {
    root: {
      "&.MuiFormLabel-root.MuiInputLabel-root": {
        color: "#394753",
        marginBottom: "5px",
        fontSize: "0.9rem",
        fontWeight: 400,
      },
    },
  },
};

export default InputLabel;
