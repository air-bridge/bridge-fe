import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import OTPVerificationScreen from "../index.tsx";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
    useLocation: vi.fn(),
  };
});

vi.mock("../../../../api/auth.ts", () => ({
  verifyOTP: vi.fn(() => Promise.resolve({ isSuccess: true })),
}));

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

  it("should proceed to next screen", async () => {
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) =>
      fireEvent.change(input, { target: { value: `${index + 1}` } }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith("/");
    });
  });
});
