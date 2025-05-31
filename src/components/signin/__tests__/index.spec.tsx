import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignIn } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

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
});
