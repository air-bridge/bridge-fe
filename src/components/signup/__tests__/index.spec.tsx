import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Signup } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Signup Component", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <Signup onChange={mockOnChange} />
      </ComponentTestWrapper>,
    );
  });

  it("should render headings", () => {
    expect(
      screen.getByText(
        "Please provide your correct details to create your account",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Or with Email")).toBeInTheDocument();
  });

  it("should render link to sign-in", () => {
    const signupButton = screen.getByRole("link", { name: "Sign in" });
    fireEvent.click(signupButton);
    expect(mockOnChange).toHaveBeenCalledOnce();
  });
});
