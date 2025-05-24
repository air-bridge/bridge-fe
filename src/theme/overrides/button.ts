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
      },
    },
    {
      props: { variant: "outlined" },
      style: {
        border: "solid 1px #0000001a",
        color: "#1C1C1C",
        "&:hover": {
          background: "#fff",
        },
      },
    },
  ],
  styleOverrides: {
    root: {
      fontWeight: 300,
    },
  },
};

export default Button;
