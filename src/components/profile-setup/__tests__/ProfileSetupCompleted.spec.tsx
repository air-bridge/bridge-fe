import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import { ProfileSetupCompleted } from "../ProfileSetupCompleted.tsx";

describe("Profile Setup Completed Component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <ProfileSetupCompleted />
      </ComponentTestWrapper>,
    );
  });

  it("renders the headings", () => {
    expect(screen.getByText("Profile Created")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You have Successfully created your account, dive in to start exploring",
      ),
    ).toBeInTheDocument();
  });

  it("renders continue button", () => {
    const continueButton = screen.getByRole("link", {
      name: "Start Exploring",
    });

    expect(continueButton).toHaveAttribute("href", "/account");
  });
});
