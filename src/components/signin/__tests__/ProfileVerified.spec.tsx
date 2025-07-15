import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import { ProfileVerified } from "../ProfileVerified.tsx";

describe("Profile Verified Component", () => {
  const mockOnNext = vi.fn();
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <ProfileVerified onNext={mockOnNext} />
      </ComponentTestWrapper>,
    );
  });

  it("renders the headings", () => {
    expect(screen.getByText("Profile Verified")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You have successfully verify your account, dive in to start exploring",
      ),
    ).toBeInTheDocument();
  });

  it("renders continue button", () => {
    const continueButton = screen.getByRole("button", {
      name: "Start Exploring",
    });

    fireEvent.click(continueButton);

    expect(mockOnNext).toHaveBeenCalledOnce();
  });
});
