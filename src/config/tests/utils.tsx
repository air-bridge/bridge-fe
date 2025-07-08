import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import * as useMediaQuery from "@mui/material/useMediaQuery";

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

export const spyOnMediaQuery = (mockDown: Function) => {
  vi.spyOn(useMediaQuery, "default").mockImplementation((cb: unknown) => {
    if (typeof cb === "function") {
      return cb({ breakpoints: { down: mockDown } });
    }
    return false;
  });
};

export const createMockFileList = (files: File[]) => {
  length = files.length;
  const fileList = {
    item: (index: number) => files[index] || null,
    ...files,
    length: files.length,
  };

  Object.setPrototypeOf(fileList, FileList.prototype);

  return fileList;
};
