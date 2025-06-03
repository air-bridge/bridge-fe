import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import Account from "../index.tsx";

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

  it("should follow the registration steps", async () => {
    const signupButton = screen.getByRole("link", { name: "Sign Up" });
    fireEvent.click(signupButton);

    // Fill registration
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password@1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "Password@1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    // Account type
    await waitFor(() => {
      expect(screen.getByText("Choose Account Type")).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    });

    // Profile data
    expect(screen.getByText("Profile Registration")).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Ale" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Maxi" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567891" },
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
      expect(screen.getByText("Profile Created")).toBeInTheDocument();
    });
  });
});
