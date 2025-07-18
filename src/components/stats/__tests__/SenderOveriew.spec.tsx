import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import { SenderOverviewStats } from "../SenderOverViewStats.tsx";

const mockData = {
  total_requests: 40,
  active_requests: 10,
  completed_orders: 30,
  recent_orders: [],
};

vi.mock("../../../api/dashboard.ts", () => ({
  senderDashboard: vi.fn(() => Promise.resolve(mockData)),
}));

describe("Sender Overview Stat Component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <SenderOverviewStats />
      </ComponentTestWrapper>,
    );
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
