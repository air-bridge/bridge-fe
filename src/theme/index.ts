import { createTheme } from "@mui/material/styles";

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

const theme = createTheme({
  spacing: (factor: number) => `${0.5 * factor}rem`, // theme.spacing(2) => 0.5 * 2rem = 1rem = 16px
  shape: {
    borderRadius: 4, // sx={borderRadius: 3} => theme.shape.borderRadius * 3 = 4px * 3 = 12px
  },
  typography: {
    fontFamily: "Figtree Variable, sans-serif",
    h1: {
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "-0.03375rem",
      lineHeight: "2rem",
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
      "@media (min-width: 1200px)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 700,
      letterSpacing: "-0.0125rem",
      lineHeight: "1.25rem",
      "@media (min-width: 1200px)": {
        fontSize: "1.125rem",
      },
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 700,
      lineHeight: "1.25rem",
      "@media (min-width: 1200px)": {
        fontSize: "1rem",
      },
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "1.25rem",
      "@media (min-width: 1200px)": {
        fontSize: "1rem",
      },
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: "1rem",
      "@media (min-width: 1200px)": {
        fontSize: "0.875rem",
      },
    },
    body1: {
      fontSize: "1",
      fontWeight: 500,
      lineHeight: "1.5rem",
      "@media (min-width: 1200px)": {
        fontSize: "1rem",
        fontWeight: 400,
      },
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.25rem",
      "@media (min-width: 1200px)": {
        fontSize: "0.875rem",
        fontWeight: 400,
      },
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      textTransform: "none",
      fontWeight: 400,
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
      default: "#F4F4F4",
    },
    iconBackground: "#D3FFF8",
    divider: "rgba(0, 0, 0, 0.12)",
    primary: {
      main: "#38A694",
      light: "#47COAC",
      dark: "#1D8776",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#E96868",
      light: "#FBEEEE",
      dark: "#5F2120",
      background: "#FDEDED",
    },
    success: {
      main: "#38A694",
      light: "#e9ffee",
      dark: "#1B5E20",
      contrastText: "#edfaf8",
    },
    info: {
      main: "#125bde",
      light: "#F1F6FE",
      dark: "#01579B",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
      dark: {
        100: "#283451",
      },
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
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
      100: "#F7F7F7",
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
  components: {},
});

export default theme;
export type Theme = typeof theme;
