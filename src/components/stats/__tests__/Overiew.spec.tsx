import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OverviewStats } from "../OverViewStats.tsx";

const mockData = [
  {
    name: "Total Request",
    count: 40,
    background: "info.light",
    color: "primary.main",
  },
  {
    name: "Active Request",
    count: 20,
    background: "warning.light",
    color: "warning.main",
  },
  {
    name: "Successful Sent Goods",
    count: 10,
    background: "success.light",
    color: "success.main",
  },
];
describe("Overview Stat Component", () => {
  it("renders stat cards label", () => {
    render(<OverviewStats isLoading={false} data={mockData} />);

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByText("Total Request")).toBeInTheDocument();
    expect(screen.getByText("Active Request")).toBeInTheDocument();
    expect(screen.getByText("Successful Sent Goods")).toBeInTheDocument();
  });

  it("renders stat data", () => {
    render(<OverviewStats isLoading={false} data={mockData} />);

    expect(screen.getByText("40")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders loader", () => {
    render(<OverviewStats isLoading data={mockData} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getAllByRole("progressbar")).toHaveLength(1);

    expect(screen.getByText("Total Request")).toBeInTheDocument();
    expect(screen.getByText("Active Request")).toBeInTheDocument();
    expect(screen.getByText("Successful Sent Goods")).toBeInTheDocument();
  });
});
