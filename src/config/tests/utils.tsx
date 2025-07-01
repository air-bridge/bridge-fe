import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ComponentTestWrapperProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const ComponentTestWrapper = ({
  ...props
}: ComponentTestWrapperProps) => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};
