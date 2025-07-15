import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignIn } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import { mockUserAuth } from "../../../mocks/user.ts";
import * as api from "../../../api/auth.ts";
import { ErrorCodes } from "../constant.ts";

vi.mock("../../../api/auth.ts", () => ({
  login: vi.fn(() => Promise.resolve({ data: mockUserAuth })),
  sendOTP: vi.fn(() => Promise.resolve({ isSuccess: true })),
  verifyOTP: vi.fn(() => Promise.resolve({ isSuccess: true })),
  activateUser: vi.fn(() => Promise.resolve({ isSuccess: true })),
}));

describe("Sign-In component", () => {
  const mockOnNext = vi.fn();

  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <SignIn onNext={mockOnNext} />
      </ComponentTestWrapper>,
    );
  });

  it("should render headings", () => {
    expect(
      screen.getByText(
        "Please provide your correct details to login to your account",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Or with Email")).toBeInTheDocument();
  });

  it("should render link to forgot password", () => {
    const forgotPasswordLink = screen.getByRole("link", {
      name: "Forgot password?",
    });
    expect(forgotPasswordLink).toHaveAttribute("href", "/auth/forgot-password");
  });

  it("should render link to signup", () => {
    const signupButton = screen.getByRole("link", { name: "Sign Up" });
    fireEvent.click(signupButton);
    expect(mockOnNext).toHaveBeenCalledOnce();
  });

  it("should switch to unverified account tab", async () => {
    vi.mocked(api.login).mockRejectedValue(
      new Error(ErrorCodes.EMAIL_NOT_VERIFIED),
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Send OTP" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Unverified Account")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Please verify your account to gain full access to your account",
        ),
      ).toBeInTheDocument();
    });
  });

  it("should switch to OTP verification tab", async () => {
    vi.mocked(api.login).mockRejectedValue(
      new Error(ErrorCodes.EMAIL_NOT_VERIFIED),
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Send OTP" }));
    });

    expect(screen.getByText("OTP Verification ?")).toBeInTheDocument();
  });

  it("should show verified screen", async () => {
    vi.mocked(api.login).mockRejectedValue(
      new Error(ErrorCodes.EMAIL_NOT_VERIFIED),
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Send OTP" }));
    });

    expect(screen.getByText("OTP Verification ?")).toBeInTheDocument();

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) =>
      fireEvent.change(input, { target: { value: `${index + 1}` } }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Profile Verified")).toBeInTheDocument();
      expect(
        screen.getByRole("button", {
          name: "Start Exploring",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "You have successfully verify your account, dive in to start exploring",
        ),
      ).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Start Exploring" }));
    });
  });
});
