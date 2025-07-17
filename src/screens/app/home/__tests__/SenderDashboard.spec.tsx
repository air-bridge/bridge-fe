import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import { SenderDashboard } from "../SenderDashboard.tsx";

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
        <SenderDashboard count={3} />
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("My Parcel")).toBeInTheDocument();
    const seeAllLink = screen.queryByRole("link", { name: "See All" });
    expect(seeAllLink).toHaveAttribute("href", "/orders");
  });
});
