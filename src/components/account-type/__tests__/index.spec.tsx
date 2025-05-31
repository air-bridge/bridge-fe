import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AccountType } from "../index.tsx";
import { AccountTabState } from "../../signin/constant.ts";

describe("Account Type Screen", () => {
  const mockOnNext = vi.fn();

  beforeEach(() => {
    render(<AccountType onNext={mockOnNext} />);
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

  it("selects account type", () => {
    const triggerSender = screen.getByTestId("Passenger");
    triggerSender.click();
    const continueButton = screen.getByRole("button", { name: "Continue" });
    fireEvent.click(continueButton);
    expect(mockOnNext).toHaveBeenCalledWith(AccountTabState.PROFILE_DATA);
  });

  it("renders continue button", () => {
    const continueButton = screen.getByRole("button", { name: "Continue" });
    fireEvent.click(continueButton);
    expect(mockOnNext).toHaveBeenCalledWith(AccountTabState.PROFILE_DATA);
  });
});
