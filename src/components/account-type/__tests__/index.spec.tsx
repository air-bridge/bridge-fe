import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import { SelectAccountType } from "../index.tsx";
import { AccountTabState } from "../../signin/constant.ts";

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
    const backLink = screen.getByRole("button", { name: "Back" });
    fireEvent.click(backLink);
    expect(mockOnNext).toHaveBeenCalledWith(AccountTabState.REGISTER);
  });

  it("renders continue button", () => {
    const continueButton = screen.getByRole("button", { name: "Continue" });
    expect(continueButton).toBeInTheDocument();
  });
});
