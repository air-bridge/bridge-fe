import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import OTPVerificationScreen from "../index.tsx";

describe("OTP Verification Screen", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <OTPVerificationScreen />,
      </ComponentTestWrapper>,
    );
  });

  it("renders the  headings", () => {
    expect(screen.getByText("OTP Verification ?")).toBeInTheDocument();
    expect(
      screen.getByText("Enter the verification code we sent to"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Type you 6 digit security code"),
    ).toBeInTheDocument();
  });

  it("renders back button", () => {
    const backLink = screen.getByRole("link", { name: "Back" });
    expect(backLink).toHaveAttribute("href", "/auth");
  });

  it("renders resend button", () => {
    expect(screen.getByText("Resend")).toBeInTheDocument();
  });
});
