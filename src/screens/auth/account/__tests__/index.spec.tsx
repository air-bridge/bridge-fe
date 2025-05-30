import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Account from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";

describe("Account Component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <Account />,
      </ComponentTestWrapper>,
    );
  });

  it("renders the login form when activeTab is LOGIN", () => {
    expect(screen.getByRole("heading", { name: "Sign In" }));
    expect(
      screen.getByText(
        "Please provide your correct details to login to your account",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("renders the signup form when activeTab is REGISTER", () => {
    expect(
      screen.queryByText(
        "Please provide your correct details to create your account",
      ),
    ).toBeNull();

    const signupButton = screen.getByRole("link", { name: "Sign Up" });
    fireEvent.click(signupButton);

    expect(screen.getByRole("heading", { name: "Sign Up" }));
    expect(
      screen.getByText(
        "Please provide your correct details to create your account",
      ),
    ).toBeInTheDocument();
  });

  it("should toggle signin / register tab", async () => {
    expect(screen.getByRole("heading", { name: "Sign In" }));
    const signupButton = screen.getByRole("link", { name: "Sign Up" });
    fireEvent.click(signupButton);

    expect(screen.getByRole("heading", { name: "Sign Up" }));
    expect(
      screen.getByText(
        "Please provide your correct details to create your account",
      ),
    ).toBeInTheDocument();

    const signInButton = screen.getByRole("link", { name: "Sign in" });
    fireEvent.click(signInButton);
    expect(screen.getByRole("heading", { name: "Sign In" }));
  });
});
