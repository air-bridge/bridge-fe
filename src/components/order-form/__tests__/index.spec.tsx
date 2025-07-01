import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OrderForm } from "../index";

describe("OrderForm", () => {
  it("renders all fields", () => {
    render(<OrderForm />);
    expect(
      screen.getByLabelText("Order Title (e.g I want to deliver a 3kg box)"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Package weight (KG)")).toBeInTheDocument();
    expect(screen.getByLabelText("From (Pickup address)")).toBeInTheDocument();
    expect(screen.getByLabelText("To (Country)")).toBeInTheDocument();
    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
    expect(screen.getByLabelText("Delivery Address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("renders luggage types", () => {
    render(<OrderForm />);
    expect(screen.getByRole("button", { name: "Box" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Documents" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Luggage" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Hand Luggage" }),
    ).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    render(<OrderForm />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });

  it("submits when required fields are filled", async () => {
    render(<OrderForm />);
    fireEvent.change(screen.getByLabelText(/order title/i), {
      target: { value: "Test Order" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // No error messages for required fields
    expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/luggage type is required/i),
    ).not.toBeInTheDocument();
  });

  it("changes luggage type selection and color", () => {
    render(<OrderForm />);
    const documentsButton = screen.getByRole("button", { name: "Documents" });
    fireEvent.click(documentsButton);
    // After click, Documents should be primary, Box should be secondary
    expect(documentsButton).toHaveClass("MuiButton-outlinedPrimary");
    const boxButton = screen.getByRole("button", { name: "Box" });
    expect(boxButton).toHaveClass("MuiButton-outlinedSecondary");
  });

  it("shows error for invalid inputs weight", async () => {
    render(<OrderForm />);

    fireEvent.change(screen.getByLabelText(/package weight/i), {
      target: { value: "-5" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText(/Weight must be a number/i),
    ).toBeInTheDocument();
  });
});
