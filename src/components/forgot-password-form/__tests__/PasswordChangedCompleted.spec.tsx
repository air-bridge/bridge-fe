import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import { PasswordChangedCompleted } from "../PasswordChangedCompleted.tsx";

describe("Password Changed Completed", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <PasswordChangedCompleted />
      </ComponentTestWrapper>,
    );
  });

  it("renders the components", () => {
    expect(screen.getByText("Password changed")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You have Successfully updated password. Please login in to start exploring",
      ),
    ).toBeInTheDocument();
  });

  it("renders continue button", () => {
    const continueButton = screen.getByRole("link", {
      name: "Start Exploring",
    });

    expect(continueButton).toHaveAttribute("href", "/");
  });
});
