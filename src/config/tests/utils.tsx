import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";

type ComponentTestWrapperProps = {
  children: React.ReactNode;
};

export const ComponentTestWrapper = ({
  ...props
}: ComponentTestWrapperProps) => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </MemoryRouter>
  );
};
