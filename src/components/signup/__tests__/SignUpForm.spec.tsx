import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignUpForm } from "../SignUpForm.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Signup form component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <SignUpForm />
      </ComponentTestWrapper>,
    );
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

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
  });
});
