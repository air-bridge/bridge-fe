import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import HomeScreen from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import { mockUserProfile } from "../../../../mocks/user.ts";
import * as api from "../../../../api/user.ts";
import { ACCOUNT_TYPE } from "../../../../context/registration/constant.ts";

vi.mock("../../../../api/user.ts", () => ({
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
}));

describe("HomeScreen for Sender", () => {
  it("renders the Home Screen text with no order", async () => {
    render(
      <ComponentTestWrapper>
        <HomeScreen />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("My Parcel")).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "See All" })).toBeNull();
    });
  });

  it("renders the Home Screen text with orders", async () => {
    render(
      <ComponentTestWrapper>
        <HomeScreen count={3} />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("My Parcel")).toBeInTheDocument();
      const seeAllLink = screen.queryByRole("link", { name: "See All" });
      expect(seeAllLink).toHaveAttribute("href", "/orders");
    });
  });
});

describe("HomeScreen for Passenger", () => {
  beforeEach(() => {
    vi.mocked(api.getProfile).mockResolvedValue({
      ...mockUserProfile,
      role: ACCOUNT_TYPE.Passenger,
      current_role: ACCOUNT_TYPE.Passenger,
    });
  });

  it("renders the Home Screen text with no order", async () => {
    render(
      <ComponentTestWrapper>
        <HomeScreen />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("My Services")).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "See All" })).toBeNull();
    });
  });

  it("renders the Home Screen text with orders", async () => {
    render(
      <ComponentTestWrapper>
        <HomeScreen count={3} />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("My Services")).toBeInTheDocument();
      const seeAllLink = screen.queryByRole("link", { name: "See All" });
      expect(seeAllLink).toHaveAttribute("href", "/services");
    });
  });
});
