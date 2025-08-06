import { createTheme } from "@mui/material/styles";
import * as Components from "./overrides";
import { TypographyStyle } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles" {
  export interface BreakpointOverrides {
    xs: true;
    sm: false;
    md: false;
    lg: true;
    xl: false;
  }

  interface PaletteOptions {
    iconBackground?: string;
  }
  interface SimplePaletteColorOptions {
    background?: string;
  }
  interface PaletteColor {
    background?: string;
  }

  export interface TypographyVariants {
    h1x: TypographyStyle;
    body1x: TypographyStyle;
    body2x: TypographyStyle;
  }

  interface TypographyVariantsOptions {
    h1x?: TypographyStyle;
    body1x?: TypographyStyle;
    body2x?: TypographyStyle;
  }
}

declare module "@mui/material/styles/createPalette" {
  export interface CommonColors {
    dark: { 100: string };
  }
}

declare module "@mui/material/Button" {
  export interface ButtonPropsVariantOverrides {
    plain: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1x: true;
    body1x: true;
    body2x: true;
  }
}

const theme = createTheme({
  spacing: (factor: number) => `${0.5 * factor}rem`, // theme.spacing(2) => 0.5 * 2rem = 1rem = 16px
  shape: {
    borderRadius: 4, // sx={borderRadius: 3} => theme.shape.borderRadius * 3 = 4px * 3 = 12px
  },
  shadows: [
    "none",
    "0px 0.5px 1px #E0E0E0", // Custom shadow for level 1
    "0px 1px 1.5px #E0E0E0", // Custom shadow for level 2
    "0px 2px 2px #E0E0E0", // Custom shadow for level 3
    // Add additional elements to ensure 25 total
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
  typography: {
    fontFamily: "Inter, sans-serif",
    h1x: {
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontWeight: 700,
      "@media (min-width: 1200px)": {
        fontSize: "4rem",
        lineHeight: "4.5rem",
      },
    },
    h1: {
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "-0.03375rem",
      lineHeight: "2rem",
      color: "#1C1C1C",
      "@media (min-width: 1200px)": {
        fontSize: "2rem",
        lineHeight: "2.5rem",
      },
    },
    h2: {
      fontSize: "1.375rem",
      fontWeight: 700,
      letterSpacing: "-0.03375rem",
      lineHeight: "1.75rem",
      color: "#1C1C1C",
      "@media (min-width: 1200px)": {
        fontSize: "1.75rem",
        lineHeight: "2.25rem",
      },
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 700,
      letterSpacing: "-0.03375rem",
      lineHeight: "1.5rem",
      color: "#1C1C1C",
      "@media (min-width: 1200px)": {
        fontSize: "1.5rem",
        lineHeight: "2rem",
      },
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: 700,
      letterSpacing: "-0.0125rem",
      lineHeight: "1.5rem",
      color: "#1C1C1C",
      "@media (min-width: 1200px)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 700,
      letterSpacing: "-0.0125rem",
      lineHeight: "1.25rem",
      color: "#1C1C1C",
      "@media (min-width: 1200px)": {
        fontSize: "1.125rem",
      },
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 700,
      lineHeight: "1.25rem",
      color: "#1C1C1C",
      "@media (min-width: 1200px)": {
        fontSize: "1rem",
      },
    },
    subtitle1: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: "1.25rem",
      color: "#1C1C1C",
      "@media (min-width: 1200px)": {
        fontSize: "1.25rem",
        lineHeight: "1.5rem",
      },
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "1.2rem",
      color: "#1C1C1C",
    },
    body1x: {
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: "1.75rem",
      "@media (min-width: 1200px)": {
        fontSize: "1.75rem",
        lineHeight: "2.5rem",
      },
    },
    body2x: {
      fontSize: "1.05rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
      "@media (min-width: 1200px)": {
        fontSize: "1.35rem",
        lineHeight: "1.75rem",
      },
    },
    body1: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      color: "#000000",
      "@media (min-width: 1200px)": {
        fontSize: "1rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      color: "#000000",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      textTransform: "none",
      fontWeight: 400,
      color: "#424242",
    },
    overline: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      textTransform: "uppercase",
      fontWeight: 400,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: "1.25rem",
      textTransform: "none",
      "@media (min-width: 1200px)": {
        fontSize: "1rem",
        textTransform: "none",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      lg: 1200,
    },
  },
  palette: {
    background: {
      default: "#F8F9FB",
    },
    iconBackground: "#D3FFF8",
    divider: "rgba(0, 0, 0, 0.12)",
    primary: {
      main: "#6544C5",
      light: "#ebe8fd",
      dark: "#3C2580",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#999999",
      light: "#BDBDBD",
      dark: "#212121",
      contrastText: "#FFF",
    },
    error: {
      main: "#DD2D27",
      light: "#F28A87",
      dark: "#7C1A17",
      contrastText: "#FFF",
      background: "#FDEDED",
    },
    success: {
      main: "#0F7409",
      light: "#EAFFE5",
      dark: "#0B4707",
      contrastText: "#FFF",
    },
    info: {
      main: "#1294F2",
      light: "#F5FAFF",
      dark: "#01579B",
      contrastText: "#FFF",
    },
    warning: {
      main: "#C79E0B",
      light: "#FFF9E6",
      dark: "#6E5805",
      contrastText: "#FFF",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
      dark: {
        100: "#283451",
      },
    },
    text: {
      primary: "rgba(0, 0, 0, 1)",
      secondary: "#394753",
      disabled: "rgba(153, 153, 153, 0.18)",
    },
    action: {
      active: "rgba(0, 0, 0, 0.56)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      focus: "rgba(0, 0, 0, 0.12)",
      disabled: "rgba(0, 0, 0, 0.38)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
    grey: {
      100: "#F8F9FB",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    MuiInputBase: Components.InputBase,
    MuiInputLabel: Components.InputLabel,
    MuiTextField: Components.TextField,
    MuiButton: Components.Button,
    MuiCard: Components.Card,
    MuiDialogActions: Components.DialogActions,
    MuiLink: Components.Link,
  },
});

export default theme;
export type Theme = typeof theme;
