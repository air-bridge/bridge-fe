import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProfileSetup } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Account Component", () => {
  const mockOnNext = vi.fn();
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <ProfileSetup onNext={mockOnNext} />
      </ComponentTestWrapper>,
    );
  });

  it("renders the headings", () => {
    expect(screen.getByText("Profile Registration")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We require your details to complete your account creation",
      ),
    ).toBeInTheDocument();
  });
});
