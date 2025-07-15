import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, it, vi } from "vitest";
import * as useMediaQuery from "@mui/material/useMediaQuery";
import { UserContextProvider } from "../../context/user";
import { NotificationContextProvider } from "../../context/notification";
import { render } from "@testing-library/react";

type ComponentTestWrapperProps = {
  children: React.ReactNode;
};

export const ComponentTestWrapper = ({
  ...props
}: ComponentTestWrapperProps) => {
  const queryClient = new QueryClient();
  return (
    <MemoryRouter initialEntries={["/"]}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <NotificationContextProvider>
            <UserContextProvider>{props.children}</UserContextProvider>
          </NotificationContextProvider>
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

export function testMediaQueryCallback(
  component: React.ReactElement,
  expectedQuery = "lg",
) {
  it("should execute the useMediaQuery callback", () => {
    const mockDown = vi.fn().mockReturnValue(false);
    spyOnMediaQuery(mockDown);

    render(<ComponentTestWrapper>{component}</ComponentTestWrapper>);

    expect(mockDown).toHaveBeenCalledWith(expectedQuery);
  });
}

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
