import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ForgotPasswordForm } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import * as api from "../../../api/auth.ts";
import { ACCOUNT_TYPE } from "../../../context/registration/constant.ts";
import { RegistrationContext } from "../../../context/registration/util.ts";

vi.mock("../../../api/auth.ts", () => ({
  sendOTP: vi.fn(() => Promise.resolve({ isSuccess: true })),
}));

describe("Forgot Password Form", () => {
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
          <ForgotPasswordForm onNext={mockOnNext} />
        </RegistrationContext.Provider>
      </ComponentTestWrapper>,
    );
  });

  it("should render component", () => {
    expect(screen.getByText("Forgot Password ?")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your email to reset your password"),
    ).toBeInTheDocument();
  });

  it("should show validation errors", async () => {
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  it("should update input fields correctly", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });

    expect(screen.getByPlaceholderText("Email")).toHaveValue("test@mail.com");
  });

  it("should submit form", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledOnce();
    });
  });

  it("should show error when email is empty and form is submitted", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("should show error when email is invalid and form is submitted", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByText("Provide valid email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("shows error when API failed", async () => {
    vi.mocked(api.sendOTP).mockRejectedValue(
      new Error("Password reset failed. Please try again!"),
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(
        screen.getByText("Password reset failed. Please try again!"),
      ).toBeInTheDocument();
      expect(mockOnNext).not.toHaveBeenCalled();
    });
  });
});
