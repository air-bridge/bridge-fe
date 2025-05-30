import {describe, expect, it, beforeEach, vi} from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignUpForm } from "../SignUpForm.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Signup form component", () => {
  const mockOnNext = vi.fn();

  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <SignUpForm onNext={mockOnNext} />
      </ComponentTestWrapper>,
    );
  });

  it("should update input fields correctly", () => {
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, {
      target: { value: "test@mail.com" },
    });
    fireEvent.blur(emailInput);

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

    expect(screen.getByPlaceholderText("Email")).toHaveValue("test@mail.com");
    expect(screen.getByPlaceholderText("Password")).toHaveValue("password");
    expect(screen.getByPlaceholderText("Repeat Password")).toHaveValue(
      "password",
    );
  });

  it("should submit form", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password@1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "Password@1" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
  });

  it("should toggle password text visibility", () => {
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

  it("should toggle confirm password text visibility", () => {
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
