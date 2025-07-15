import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  ComponentTestWrapper,
  testMediaQueryCallback,
} from "../../../config/tests/utils.tsx";
import { mockUserProfile } from "../../../mocks/user.ts";
import { SetNewPassword } from "../SetNewPassword.tsx";
import * as useMediaQuery from "@mui/material/useMediaQuery";
import * as api from "../../../api/auth.ts";

vi.mock("../../../api/user.ts", () => ({
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
}));

vi.mock("../../../api/auth.ts", () => ({
  setNewPassword: vi.fn(() => Promise.resolve({ isSuccess: true })),
}));

describe("SetNewPassword Component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <SetNewPassword email="test@mail.com" />
      </ComponentTestWrapper>,
    );
  });

  it("renders components", () => {
    expect(screen.getByText("Update Password")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your current password to make update"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
  });

  it("should populate fields with initial values", () => {
    expect(screen.getByPlaceholderText("Current Password")).toHaveValue("");
    expect(screen.getByPlaceholderText("New Password")).toHaveValue("");
    expect(screen.getByPlaceholderText("Repeat New Password")).toHaveValue("");
  });

  it("should update input fields correctly", () => {
    const passwordInput = screen.getByPlaceholderText("Current Password");
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });
    fireEvent.blur(passwordInput);

    const confirmPasswordInput = screen.getByPlaceholderText(
      "Repeat New Password",
    );
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password" },
    });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.getByPlaceholderText("Current Password")).toHaveValue(
      "password",
    );
    expect(screen.getByPlaceholderText("Repeat New Password")).toHaveValue(
      "password",
    );
  });

  it("should show validation errors", async () => {
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => {
      expect(
        screen.getByText("Current Password is required"),
      ).toBeInTheDocument();
      expect(screen.getByText("New Password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm New Password is required"),
      ).toBeInTheDocument();
    });
  });

  it("should submit form", async () => {
    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "Password@1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "Password@155" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat New Password"), {
      target: { value: "Password@155" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => {
      // TODO: mockOnSubmit after action
    });
  });

  it("should toggle current password text visibility", () => {
    expect(screen.getByPlaceholderText("Current Password")).toHaveAttribute(
      "type",
      "password",
    );

    fireEvent.click(screen.getByTestId("toggle-current-password-visibility"));

    expect(screen.getByPlaceholderText("Current Password")).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("should toggle password text visibility", () => {
    expect(screen.getByPlaceholderText("Current Password")).toHaveAttribute(
      "type",
      "password",
    );

    fireEvent.click(screen.getByTestId("toggle-current-password-visibility"));

    expect(screen.getByPlaceholderText("Current Password")).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("should toggle new password text visibility", () => {
    expect(screen.getByPlaceholderText("New Password")).toHaveAttribute(
      "type",
      "password",
    );

    fireEvent.click(screen.getByTestId("toggle-password-visibility"));

    expect(screen.getByPlaceholderText("New Password")).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("should toggle confirm password text visibility", () => {
    expect(screen.getByPlaceholderText("Repeat New Password")).toHaveAttribute(
      "type",
      "password",
    );

    fireEvent.click(screen.getByTestId("toggle-confirm-password-visibility"));

    expect(screen.getByPlaceholderText("Repeat New Password")).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("should show error when API fails", async () => {
    vi.mocked(api.setNewPassword).mockRejectedValue(
      new Error("Unable to save changes!"),
    );

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "Password@1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "Password@155" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat New Password"), {
      target: { value: "Password@155" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => {
      expect(screen.getByText("Unable to save changes!")).toBeInTheDocument();
    });
  });
});

describe("Set new Password Mobile", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
    render(
      <ComponentTestWrapper>
        <SetNewPassword email="test@mail.com" />
      </ComponentTestWrapper>,
    );
  });

  it("renders empty component in mobile", () => {
    expect(screen.getByTestId("mobile-button")).toBeInTheDocument();
    expect(screen.queryByTestId("lg-button")).not.toBeInTheDocument();
  });
});

// INFO: Needed coverage for media breakpoints
testMediaQueryCallback(<SetNewPassword email="test@mail.com" />);
