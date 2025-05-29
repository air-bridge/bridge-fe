import { describe, expect, vi, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AccountTypesInfo } from "../index.tsx";
import { AccountType } from "../../../types/auth.ts";

describe("Account Type Screen", () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    render(
      <AccountTypesInfo
        accountType={AccountType.Passenger}
        onSelect={mockOnSelect}
      />,
    );
  });

  it("renders Account type titles", () => {
    expect(screen.getByText("Sender")).toBeInTheDocument();
    expect(screen.getByText("Passenger")).toBeInTheDocument();
  });

  it("calls onSelect for Sender account type", () => {
    const triggerSender = screen.getByTestId("Sender");
    triggerSender.click();
    expect(mockOnSelect).toHaveBeenCalledOnce();
    expect(mockOnSelect).toHaveBeenCalledWith(AccountType.Sender);
  });

  it("calls onSelect for Passenger account type", () => {
    const triggerSender = screen.getByTestId("Passenger");
    triggerSender.click();
    expect(mockOnSelect).toHaveBeenCalledOnce();
    expect(mockOnSelect).toHaveBeenCalledWith(AccountType.Passenger);
  });
});
