import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import OTPVerificationScreen from "../index.tsx";

describe("OTPVerificationScreen Component", () => {
  beforeEach(() => {
    render(<OTPVerificationScreen />);
  });

  it("renders the OTPVerificationScreen component", () => {
    expect(screen.getByText("OTP verification Screen")).toBeInTheDocument();
  });
});
