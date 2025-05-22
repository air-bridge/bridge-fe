import type { Components, Theme } from "@mui/material/styles";

const Button: Components<Theme>["MuiButton"] = {
  defaultProps: {
    size: "medium",
    disableElevation: false,
  },
  variants: [
    {
      props: { size: "large" },
      style: {
        borderRadius: "16px",
      },
    },
    {
      props: { size: "small" },
      style: {
        borderRadius: "10px",
      },
    },
    {
      props: { size: "medium" },
      style: {
        borderRadius: "14px",
      },
    },
  ],
  styleOverrides: {
    root: {
      fontWeight: 400,
    },
  },
};

export default Button;
