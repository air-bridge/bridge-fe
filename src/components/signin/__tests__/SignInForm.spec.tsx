import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignInForm } from "../SignInForm.tsx";

describe("Sign-In form component", () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  it("should update input fields correctly", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    expect(screen.getByPlaceholderText("Email")).toHaveValue("test@mail.com");
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
});
