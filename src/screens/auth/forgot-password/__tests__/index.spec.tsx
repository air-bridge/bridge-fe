import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ForgotPasswordScreen from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";

describe("ForgotPasswordScreen Component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <ForgotPasswordScreen />
      </ComponentTestWrapper>,
    );
  });

  it("renders the  headings", () => {
    expect(screen.getByText("Forgot Password ?")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your email to reset your password"),
    ).toBeInTheDocument();
  });

  it("renders back button", () => {
    const backLinks = screen.getAllByRole("link", { name: "Back" });
    expect(backLinks).toHaveLength(2);
    expect(backLinks[0]).toHaveAttribute("href", "/auth");
    expect(backLinks[1]).toHaveAttribute("href", "/auth");
  });
});
