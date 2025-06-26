import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OverviewStats } from "../OverViewStats.tsx";

describe("Overview Stat Component", () => {
  it("renders component", () => {
    render(<OverviewStats />);

    expect(screen.getByText("Total Request")).toBeInTheDocument();
    expect(screen.getByText("Active Request")).toBeInTheDocument();
    expect(screen.getByText("Successful Sent Goods")).toBeInTheDocument();
  });
});
