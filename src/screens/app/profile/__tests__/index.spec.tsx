import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import ProfileScreen from "../index.tsx";
import { mockUserProfile } from "../../../../mocks/user.ts";

vi.mock("../../../../api/user.ts", () => ({
  setNotifications: vi.fn(() => Promise.resolve({ isSuccess: true })),
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
}));

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

  it("should populate fields with initial values", async () => {
    await waitFor(() => {
      expect(screen.getByPlaceholderText("First Name")).toHaveValue(
        mockUserProfile.firstname,
      );
      expect(screen.getByPlaceholderText("Last Name")).toHaveValue(
        mockUserProfile.lastname,
      );
      expect(screen.getByPlaceholderText("Phone Number")).toHaveValue(
        mockUserProfile.phone,
      );
      expect(screen.getByPlaceholderText("Select country")).toHaveValue(
        mockUserProfile.country_code,
      );
      expect(screen.getByPlaceholderText("State of Residence")).toHaveValue(
        mockUserProfile.state,
      );
    });
  });
});
