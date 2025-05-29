import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AccountTypeScreen from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";

describe("Account Type Screen", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <AccountTypeScreen />,
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
