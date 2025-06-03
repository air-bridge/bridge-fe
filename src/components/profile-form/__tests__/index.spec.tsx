import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProfileForm } from "../index.tsx";

describe("Profile form component", () => {
  const mockOnNext = vi.fn();

  beforeEach(() => {
    render(<ProfileForm onNext={mockOnNext} />);
  });

  it("should update input fields correctly", () => {
    const firstNameInput = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameInput, {
      target: { value: "Alex" },
    });
    fireEvent.blur(firstNameInput);

    const lastNameInput = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastNameInput, {
      target: { value: "Max" },
    });
    fireEvent.blur(lastNameInput);

    const phoneInput = screen.getByPlaceholderText("Phone Number");
    fireEvent.change(phoneInput, {
      target: { value: "1234567890" },
    });
    fireEvent.blur(phoneInput);

    const countrySelect = screen.getByPlaceholderText("Select country");
    fireEvent.change(countrySelect, {
      target: { value: "Nigeria" },
    });
    fireEvent.keyDown(countrySelect, { key: "ArrowDown" });
    fireEvent.keyDown(countrySelect, { key: "Enter" });

    const stateSelect = screen.getByRole("combobox", {
      name: "State of Residence",
    });
    fireEvent.mouseDown(stateSelect);
    const stateOption = screen.getByRole("option", { name: "Abuja" });
    fireEvent.click(stateOption);
    fireEvent.blur(stateSelect);

    expect(screen.getByPlaceholderText("First Name")).toHaveValue("Alex");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("Max");
    expect(screen.getByPlaceholderText("Phone Number")).toHaveValue(
      "1234567890",
    );
    expect(screen.getByPlaceholderText("Select country")).toHaveValue(
      "Nigeria",
    );
    expect(screen.getByPlaceholderText("State of Residence")).toHaveValue(
      "Abuja",
    );
  });

  it("should submit form", async () => {
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Max" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
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
      expect(mockOnNext).toHaveBeenCalledOnce();
    });
  });
});
