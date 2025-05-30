import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import { SelectAccountType } from "../index.tsx";

describe("Account Type Screen", () => {
  const mockOnNext = vi.fn();

  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <SelectAccountType onNext={mockOnNext} />,
      </ComponentTestWrapper>,
    );
  });

  it("renders the  headings", () => {
    expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
    expect(
      screen.getByText("Select the account type that best resonate with you"),
    ).toBeInTheDocument();
  });

  it("renders back button", () => {
    const backLink = screen.getByRole("link", { name: "Back" });
    expect(backLink).toHaveAttribute("href", "/auth");
  });

  it("renders continue button", () => {
    const continueButton = screen.getByRole("button", { name: "Continue" });
    expect(continueButton).toBeInTheDocument();
  });
});
