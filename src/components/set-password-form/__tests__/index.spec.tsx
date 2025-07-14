import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SetPasswordForm } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import * as api from "../../../api/auth.ts";
import { ACCOUNT_TYPE } from "../../../context/registration/constant.ts";
import { RegistrationContext } from "../../../context/registration/util.ts";

vi.mock("../../../api/auth.ts", () => ({
  setNewPassword: vi.fn(() => Promise.resolve({ isSuccess: true })),
}));

describe("Set Password Form", () => {
  const mockOnNext = vi.fn();
  const mockPayload = {
    email: "test@mail.com",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    country_code: "",
    state: "",
    role: ACCOUNT_TYPE.Sender,
  };

  const mockHandlePayload = vi.fn();

  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <RegistrationContext.Provider
          value={{
            payload: mockPayload,
            setRegistrationInfo: mockHandlePayload,
          }}
        >
          <SetPasswordForm onNext={mockOnNext} />
        </RegistrationContext.Provider>
      </ComponentTestWrapper>,
    );
  });

  it("should render component", () => {
    expect(screen.getByText("Setup New Password")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
  });

  it("should show validation errors", async () => {
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm Password is required"),
      ).toBeInTheDocument();
    });
  });

  it("should update input fields correctly", () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, {
      target: { value: "password1" },
    });
    fireEvent.blur(passwordInput);

    const confirmPasswordInput = screen.getByPlaceholderText("Repeat Password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password" },
    });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.getByPlaceholderText("Password")).toHaveValue("password1");
    expect(screen.getByPlaceholderText("Repeat Password")).toHaveValue(
      "password",
    );
  });

  it("should submit form", async () => {
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password@1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "Password@1" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledOnce();
    });
  });

  it("shows error when API failed", async () => {
    vi.mocked(api.setNewPassword).mockRejectedValue(
      new Error("Password reset failed. Please try again!"),
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password@1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "Password@1" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(
        screen.getByText("Password reset failed. Please try again!"),
      ).toBeInTheDocument();

      expect(mockOnNext).not.toHaveBeenCalled();
    });
  });

  it("toggle password text visibility", () => {
    expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
      "type",
      "password",
    );

    fireEvent.click(screen.getByTestId("toggle-password-visibility"));

    expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("toggle confirm password text visibility", () => {
    expect(screen.getByPlaceholderText("Repeat Password")).toHaveAttribute(
      "type",
      "password",
    );

    fireEvent.click(screen.getByTestId("toggle-confirm-password-visibility"));

    expect(screen.getByPlaceholderText("Repeat Password")).toHaveAttribute(
      "type",
      "text",
    );
  });
});
