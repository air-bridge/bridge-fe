import { describe, it, vi, expect, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ProfileSetup } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import { AccountTabState } from "../../signin/constant.ts";
import { mockUserAuth } from "../../../mocks/user.ts";

vi.mock("../../../api/auth.ts", () => ({
  register: vi.fn(() => Promise.resolve({ data: mockUserAuth })),
}));

describe("Account Component", () => {
  const mockOnNext = vi.fn();
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <ProfileSetup onNext={mockOnNext} />
      </ComponentTestWrapper>,
    );
  });

  it("renders the headings", () => {
    expect(screen.getByText("Profile Registration")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We require your details to complete your account creation",
      ),
    ).toBeInTheDocument();
  });

  it("renders back button", () => {
    const backLink = screen.getByRole("button", { name: "Back" });
    fireEvent.click(backLink);
    expect(mockOnNext).toHaveBeenCalledWith(AccountTabState.ACCOUNT_TYPE);
  });

  it("moves to he next step", async () => {
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Ale" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Maxi" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567891" },
    });

    const countrySelect = screen.getByPlaceholderText("Select country");
    fireEvent.change(countrySelect, {
      target: { value: "Nigeria" },
    });
    fireEvent.keyDown(countrySelect, { key: "ArrowDown" });
    fireEvent.keyDown(countrySelect, { key: "Enter" });

    const stateSelect = screen.getByRole("combobox", {
      name: "State of Residence",
    });
    expect(stateSelect).toBeInTheDocument();
    fireEvent.mouseDown(stateSelect);
    const stateOption = screen.getByRole("option", { name: "Lagos" });
    fireEvent.click(stateOption);

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledWith(AccountTabState.OTP_VERIFICATION);
    });
  });
});
