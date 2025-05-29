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

    expect(screen.getByPlaceholderText("First Name")).toHaveValue("Alex");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("Max");
    expect(screen.getByPlaceholderText("Phone Number")).toHaveValue(
      "1234567890",
    );
  });

  it("should submit form", () => {
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

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  });
});
