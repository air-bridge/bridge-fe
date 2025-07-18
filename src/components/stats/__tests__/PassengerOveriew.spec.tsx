import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { PassengerOverviewStats } from "../PassengerOverViewStats.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

const mockData = {
  total_requests: 40,
  active_requests: 10,
  total_services: 30,
  active_services: 10,
  recent_requests: [],
};

vi.mock("../../../api/dashboard.ts", () => ({
  passengerDashboard: vi.fn(() => Promise.resolve(mockData)),
}));

describe("Passenger Overview Stat Component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <PassengerOverviewStats />
      </ComponentTestWrapper>,
    );
  });

  it("renders stat cards label", async () => {
    await waitFor(() => {
      expect(screen.getByText("Total Request")).toBeInTheDocument();
      expect(screen.getByText("Active Service")).toBeInTheDocument();
      expect(screen.getByText("Total Service")).toBeInTheDocument();
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
