import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
        <PassengerDashboard count={3} />
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("My Services")).toBeInTheDocument();
    const seeAllLink = screen.queryByRole("link", { name: "See All" });
    expect(seeAllLink).toHaveAttribute("href", "/services");
  });
});
