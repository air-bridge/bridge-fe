import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import ProfileScreen from "../index.tsx";
import { mockUserProfile } from "../../../../mocks/user.ts";
import * as api from "../../../../api/user.ts";

vi.mock("../../../../api/user.ts", () => ({
  setNotifications: vi.fn(() => Promise.resolve({ isSuccess: true })),
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
}));

describe("ProfileScreen Component", () => {
  it("renders the Home Screen text with no order", () => {
    render(
      <ComponentTestWrapper>
        <ProfileScreen />
      </ComponentTestWrapper>,
    );
    expect(screen.getByText("Profile Information")).toBeInTheDocument();
  });

  it("renders back link", () => {
    render(
      <ComponentTestWrapper>
        <ProfileScreen />
      </ComponentTestWrapper>,
    );
    expect(screen.getByRole("link", { name: "Back" })).toBeInTheDocument();
  });

  it("should populate fields with initial values", async () => {
    render(
      <ComponentTestWrapper>
        <ProfileScreen />
      </ComponentTestWrapper>,
    );

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

  it("shows API error", async () => {
    vi.mocked(api.getProfile).mockImplementationOnce(() =>
      Promise.reject(new Error("Fail to fetch profile, please try again!")),
    );

    render(
      <ComponentTestWrapper>
        <ProfileScreen />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Fail to fetch profile, please try again!"),
      ).toBeInTheDocument();
    });
  });
});
