import type { Components, Theme } from "@mui/material/styles";

const Tooltip: Components<Theme>["MuiTooltip"] = {
  styleOverrides: {
    tooltip: {
      padding: "8px",
      background: "#6544C5",
      fontSize: "0.75rem",
      "@media (min-width: 1200px)": {
        padding: "12px",
      },
    },
  },
};

export default Tooltip;
