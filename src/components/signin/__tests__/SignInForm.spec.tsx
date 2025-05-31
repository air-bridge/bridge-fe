import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignInForm } from "../SignInForm.tsx";

describe("Sign-In form component", () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  it("should update sign-in input fields correctly", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test1@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    expect(screen.getByPlaceholderText("Email")).toHaveValue("test1@mail.com");
    expect(screen.getByPlaceholderText("Password")).toHaveValue("password");
  });

  it("should submit form", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
  });

  it("should toggle password text visibility", () => {
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
      "type",
      "password",
    );

    fireEvent.click(
      screen.getByRole("button", { name: "display the password" }),
    );

    expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
      "type",
      "text",
    );
  });
});
