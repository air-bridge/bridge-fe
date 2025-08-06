import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import { SenderDashboard } from "../SenderDashboard.tsx";

const mockData = {
  total_requests: 40,
  active_requests: 10,
  completed_orders: 30,
  recent_orders: [],
};

vi.mock("../../../../api/dashboard.ts", () => ({
  getSenderDashboard: vi.fn(() => Promise.resolve(mockData)),
}));

describe("Sender Dashboard Component", () => {
  it("renders the dashboard Screen text with no service", () => {
    render(
      <ComponentTestWrapper>
        <SenderDashboard />
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("My Parcel")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "See All" })).toBeNull();
  });

  it("renders the dashboard text with orders", () => {
    render(
      <ComponentTestWrapper>
        <SenderDashboard />
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("My Parcel")).toBeInTheDocument();
    const seeAllLink = screen.queryByRole("link", { name: "See All" });
    expect(seeAllLink).toHaveAttribute("href", "/orders");
  });

  it("renders stat cards label", async () => {
    await waitFor(() => {
      expect(screen.getByText("Total Request")).toBeInTheDocument();
      expect(screen.getByText("Active Request")).toBeInTheDocument();
      expect(screen.getByText("Successful Sent Goods")).toBeInTheDocument();
    });
  });

  it("renders stat data", async () => {
    await waitFor(() => {
      expect(screen.getByText("40")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("30")).toBeInTheDocument();
    });
  });
});
