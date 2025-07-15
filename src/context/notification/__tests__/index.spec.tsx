import { describe, it, expect, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { NotificationContextProvider } from "../index.tsx";
import { NotificationContext } from "../util.ts";
import React, { useContext } from "react";
import { AlertProps } from "@mui/material";

function NotificationOpener({
  message,
  severity,
}: {
  message: string;
  severity: AlertProps["severity"];
}) {
  const { openNotification } = useContext(NotificationContext);
  React.useEffect(() => {
    openNotification(message, severity);
  }, [message, severity, openNotification]);
  return null;
}

describe("NotificationContextProvider", () => {
  it("should render component with provider", () => {
    const { getByText } = render(
      <NotificationContextProvider>
        <p>Notification child component</p>
      </NotificationContextProvider>,
    );
    expect(getByText("Notification child component")).toBeInTheDocument();
  });

  it("renders notification with correct message and severity", () => {
    render(
      <NotificationContextProvider>
        <NotificationOpener
          message="Test notification message"
          severity="error"
        />
      </NotificationContextProvider>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByText("Test notification message")).toBeInTheDocument();
    expect(alert.className).toMatch(/MuiAlert-filledError/);
  });

  it("handle close notification via alert icon", () => {
    render(
      <NotificationContextProvider>
        <NotificationOpener
          message="Test notification message"
          severity="error"
        />
      </NotificationContextProvider>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByText("Test notification message")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("CloseIcon"));
  });

  it("handle close notification via clicking outside icon", async () => {
    vi.useFakeTimers();

    render(
      <NotificationContextProvider>
        <NotificationOpener
          message="Test notification message"
          severity="error"
        />
      </NotificationContextProvider>,
    );

    // Ensure it's visible first
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Advance time to trigger auto-hide
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    vi.useRealTimers();
  });

  it("does not render notification when open is false", () => {
    render(
      <NotificationContextProvider>
        <p>Notification child component</p>
      </NotificationContextProvider>,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
