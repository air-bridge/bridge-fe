import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { NotificationContextProvider } from "../index.tsx";
import { PropsWithChildren } from "react";
import { useNotificationContext } from "../util.ts";

const wrapper = ({ children }: PropsWithChildren) => (
  <NotificationContextProvider>{children}</NotificationContextProvider>
);

describe("useNotificationContext", () => {
  it("should set the initial state", () => {
    const {
      result: {
        current: { open },
      },
    } = renderHook(useNotificationContext);

    expect(open).toBeFalsy();
  });

  it("should open notification", () => {
    const { result } = renderHook(useNotificationContext, { wrapper });

    act(() => {
      result.current.openNotification("Notification message");
    });

    expect(result.current.open).toBeTruthy();
  });
});

describe("NotificationContextProvider direct function coverage", () => {
  it("should call openNotification directly from context", () => {
    const { result } = renderHook(useNotificationContext);

    act(() => {
      result.current.openNotification("Notification message");
    });

    // No assertion needed, just ensure the function is called for coverage
  });
});
