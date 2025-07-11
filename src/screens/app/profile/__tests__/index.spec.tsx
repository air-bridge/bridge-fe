import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import ProfileScreen from "../index.tsx";

describe("ProfileScreen Component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <ProfileScreen />
      </ComponentTestWrapper>,
    );
  });

  it("renders the Home Screen text with no order", () => {
    expect(screen.getByText("Profile Information")).toBeInTheDocument();
  });

  it("renders back link", () => {
    expect(screen.getByRole("link", { name: "Back" })).toBeInTheDocument();
  });
});
