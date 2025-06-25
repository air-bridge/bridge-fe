import type { Components, Theme } from "@mui/material/styles";

const Button: Components<Theme>["MuiButton"] = {
  defaultProps: {
    size: "medium",
  },
  variants: [
    {
      props: { size: "large" },
      style: {
        borderRadius: "16px",
        padding: "15px 35px",
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
        padding: "10px 16px",
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
