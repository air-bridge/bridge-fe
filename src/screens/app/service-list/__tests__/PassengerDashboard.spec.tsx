import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import { PassengerDashboard } from "../PassengerDashboard.tsx";

describe("Passenger Dashboard Component", () => {
  it("renders the dashboard Screen text with no service", () => {
    render(
      <ComponentTestWrapper>
        <PassengerDashboard />
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("My Services")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "See All" })).toBeNull();
  });

  it("renders the dashboard text with services", () => {
    render(
      <ComponentTestWrapper>
        <PassengerDashboard />
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("My Services")).toBeInTheDocument();
    const seeAllLink = screen.queryByRole("link", { name: "See All" });
    expect(seeAllLink).toHaveAttribute("href", "/services");
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
