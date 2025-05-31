import { describe, expect, vi, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AccountTypesInfo } from "../index.tsx";
import { ACCOUNT_TYPE } from "../../../context/registration/constant.ts";

describe("Account Type Screen", () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    render(
      <AccountTypesInfo
        accountType={ACCOUNT_TYPE.Passenger}
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
    expect(mockOnSelect).toHaveBeenCalledWith(ACCOUNT_TYPE.Sender);
  });

  it("calls onSelect for Passenger account type", () => {
    const triggerSender = screen.getByTestId("Passenger");
    triggerSender.click();
    expect(mockOnSelect).toHaveBeenCalledOnce();
    expect(mockOnSelect).toHaveBeenCalledWith(ACCOUNT_TYPE.Passenger);
  });
});
