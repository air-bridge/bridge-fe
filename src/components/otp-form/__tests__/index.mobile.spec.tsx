import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OTPForm } from "../index.tsx";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));
vi.mock("@mui/material/useMediaQuery", async () => {
  return {
    default: () => {
      return true;
    },
  };
});

describe("OTP Form Component - Mobile", () => {
  beforeEach(() => {
    render(<OTPForm />);
  });

  it("should update input fields correctly", () => {
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });

    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
  });
});
