import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  ComponentTestWrapper,
  testMediaQueryCallback,
} from "../../../config/tests/utils.tsx";
import { mockUserAuth } from "../../../mocks/user.ts";
import * as userAuth from "../../../utils/userAuth.ts";
import { SetNewPassword } from "../SetNewPassword.tsx";
import * as useMediaQuery from "@mui/material/useMediaQuery";
import { ProfileAvatar } from "../ProfileAvatar.tsx";

vi.mock("../../../api/user.ts", () => ({
  setNewPassword: vi.fn(() => Promise.resolve({ isSuccess: true })),
}));

describe("Personal Details", () => {
  beforeEach(() => {
    vi.spyOn(userAuth, "getAuthUser").mockReturnValue(mockUserAuth);

    render(
      <ComponentTestWrapper>
        <SetNewPassword />
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
    expect(screen.getByPlaceholderText("Password")).toHaveValue("");
    expect(screen.getByPlaceholderText("Repeat Password")).toHaveValue("");
  });

  it("should update input fields correctly", () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });
    fireEvent.blur(passwordInput);

    const confirmPasswordInput = screen.getByPlaceholderText("Repeat Password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password" },
    });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.getByPlaceholderText("Password")).toHaveValue("password");
    expect(screen.getByPlaceholderText("Repeat Password")).toHaveValue(
      "password",
    );
  });

  it("should show validation errors", async () => {
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => {
      expect(
        screen.getByText("Current password is required"),
      ).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm Password is required"),
      ).toBeInTheDocument();
    });
  });

  it("should submit form", async () => {
    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "Password@1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password@155" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "Password@155" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => {
      // TODO: mockOnSubmit after action
    });
  });
});

describe("Set new Password Mobile", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
    render(
      <ComponentTestWrapper>
        <SetNewPassword />
      </ComponentTestWrapper>,
    );
  });

  it("renders empty component in mobile", () => {
    expect(screen.getByTestId("mobile-button")).toBeInTheDocument();
    expect(screen.queryByTestId("lg-button")).not.toBeInTheDocument();
  });
});

// INFO: Needed coverage for media breakpoints
testMediaQueryCallback(<ProfileAvatar />);
