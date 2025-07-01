import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { OTPForm } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import * as ReactRouterDom from "react-router-dom";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual: typeof ReactRouterDom =
    await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock("../../../api/auth.ts", () => ({
  verifyOTP: vi.fn(() => Promise.resolve({ isSuccess: true })),
}));

describe("OTP Form Component", () => {
  const mockOnNext = vi.fn();

  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <OTPForm onNext={mockOnNext} />
      </ComponentTestWrapper>,
    );
  });

  it("should update input fields correctly", () => {
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });

    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
  });

  it("focuses next input field on valid input", () => {
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });

    expect(document.activeElement).toBe(inputs[1]);
  });

  it("does not update input field with invalid input", () => {
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "a" } });

    expect(inputs[0]).toHaveValue("");
  });

  it("focuses previous input field on backspace when empty", () => {
    const inputs = screen.getAllByRole("textbox");
    fireEvent.keyDown(inputs[1], { key: "Backspace" });

    expect(document.activeElement).toBe(inputs[0]);
  });

  it("submits OTP form successfully", async () => {
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) =>
      fireEvent.change(input, { target: { value: `${index + 1}` } }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledOnce();
    });
  });
});

describe("OTP Form Component - Mobile", () => {
  const mockOnNext = vi.fn();
  it("should update input fields correctly", () => {
    render(
      <ComponentTestWrapper>
        <OTPForm onNext={mockOnNext} mobile />
      </ComponentTestWrapper>,
    );
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "4" } });
    fireEvent.change(inputs[1], { target: { value: "5" } });

    expect(inputs[0]).toHaveValue("4");
    expect(inputs[1]).toHaveValue("5");
  });
});
