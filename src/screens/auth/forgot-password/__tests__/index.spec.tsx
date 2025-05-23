import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ForgotPasswordScreen from "../index.tsx";

describe("ForgotPasswordScreen Component", () => {
  beforeEach(() => {
    render(<ForgotPasswordScreen />);
  });

  it("renders the ForgotPasswordScreen component", () => {
    expect(screen.getByText("Forgot Password Screen")).toBeInTheDocument();
  });
});
