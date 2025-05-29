import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProfileForm } from "../index.tsx";

describe("Profile form component", () => {
  beforeEach(() => {
    render(<ProfileForm />);
  });

  it("should update input fields correctly", () => {
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Max" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Country of Residence"), {
      target: { value: "Germany" },
    });
    fireEvent.change(screen.getByPlaceholderText("State of Residence"), {
      target: { value: "Berlin" },
    });

    const countrySelect = screen.getByRole("combobox", {
      name: "Country of Residence",
    });
    fireEvent.mouseDown(countrySelect);
    const countryOption = screen.getByRole("option", { name: "Nigeria" });
    fireEvent.click(countryOption);

    const stateSelect = screen.getByRole("combobox", {
      name: "State of Residence",
    });
    fireEvent.mouseDown(stateSelect);
    const stateOption = screen.getByRole("option", { name: "Hamburg" });
    fireEvent.click(stateOption);

    expect(screen.getByPlaceholderText("First Name")).toHaveValue("Alex");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("Max");
    expect(screen.getByPlaceholderText("Phone Number")).toHaveValue(
      "1234567890",
    );
    expect(screen.getByPlaceholderText("Country of Residence")).toHaveValue(
      "ng",
    );
    expect(screen.getByPlaceholderText("State of Residence")).toHaveValue("hg");
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

    const countrySelect = screen.getByRole("combobox", {
      name: "Country of Residence",
    });

    fireEvent.mouseDown(countrySelect);
    const countryOption = screen.getByRole("option", { name: "Germany" });
    fireEvent.click(countryOption);

    const stateSelect = screen.getByRole("combobox", {
      name: "State of Residence",
    });
    fireEvent.mouseDown(stateSelect);
    const stateOption = screen.getByRole("option", { name: "Lagos" });
    fireEvent.click(stateOption);

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  });
});
