import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  ComponentTestWrapper,
  testMediaQueryCallback,
} from "../../../config/tests/utils.tsx";
import * as useMediaQuery from "@mui/material/useMediaQuery";
import { NotificationsSetting } from "../NotificationsSetting.tsx";
import { mockUserProfile } from "../../../mocks/user.ts";
import * as api from "../../../api/user.ts";

vi.mock("../../../api/user.ts", () => ({
  setNotifications: vi.fn(() => Promise.resolve({ isSuccess: true })),
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
}));

describe("Notifications Setting", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <NotificationsSetting />
      </ComponentTestWrapper>,
    );
  });

  it("renders components", () => {
    expect(screen.getByText("Notification")).toBeInTheDocument();
    expect(
      screen.getByText("Set up notifications for your account"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
  });

  it("renders input fields", () => {
    expect(screen.getByLabelText("In app Notification")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Notification")).toBeInTheDocument();
    expect(screen.getByLabelText("SMS Notification")).toBeInTheDocument();
  });

  it("should submit form ", () => {
    fireEvent.click(screen.getByLabelText("SMS Notification"));

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    // TODO: mockOnSubmit after action
  });

  it("should show API error ", async () => {
    vi.mocked(api.setNotifications).mockRejectedValue(
      new Error("Unable to save changes!"),
    );

    fireEvent.click(screen.getByLabelText("In app Notification"));
    fireEvent.click(screen.getByLabelText("Email Notification"));
    fireEvent.click(screen.getByLabelText("SMS Notification"));

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => {
      expect(screen.getByText("Unable to save changes!")).toBeInTheDocument();
    });
  });
});

describe("Notification Settings Mobile", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
    render(
      <ComponentTestWrapper>
        <NotificationsSetting />
      </ComponentTestWrapper>,
    );
  });

  it("renders empty component in mobile", () => {
    expect(screen.getByTestId("mobile-button")).toBeInTheDocument();
    expect(screen.queryByTestId("lg-button")).not.toBeInTheDocument();
  });
});

// INFO: Needed coverage for media breakpoints
testMediaQueryCallback(<NotificationsSetting />);
