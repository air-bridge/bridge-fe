import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ForgotPasswordForm } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Account Type Screen", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <ForgotPasswordForm />
      </ComponentTestWrapper>,
    );
  });

  it("should update input fields correctly", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });

    expect(screen.getByPlaceholderText("Email")).toHaveValue("test@mail.com");
  });

  it("should submit form", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
  });
});
