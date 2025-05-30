import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Signup } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Signup Component", () => {
  const mockOnNext = vi.fn();

  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <Signup onNext={mockOnNext} />
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
    const signInButton = screen.getByRole("link", { name: "Sign in" });
    fireEvent.click(signInButton);
    expect(mockOnNext).toHaveBeenCalledOnce();
  });
});
