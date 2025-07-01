import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OTPForm } from "../index.tsx";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

describe("OTP Form Component", () => {
  const mockOnNext = vi.fn();

  beforeEach(() => {
    render(<OTPForm onNext={mockOnNext} />);
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

  it("submits OTP form successfully", () => {
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) =>
      fireEvent.change(input, { target: { value: `${index + 1}` } }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(mockedNavigate).toHaveBeenCalledWith("/auth/profile-data");
  });
});

describe("OTP Form Component - Mobile", () => {
  const mockOnNext = vi.fn();
  it("should update input fields correctly", () => {
    render(<OTPForm onNext={mockOnNext} mobile />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "4" } });
    fireEvent.change(inputs[1], { target: { value: "5" } });

    expect(inputs[0]).toHaveValue("4");
    expect(inputs[1]).toHaveValue("5");
  });
});
