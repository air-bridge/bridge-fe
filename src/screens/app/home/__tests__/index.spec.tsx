import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeScreen from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";

describe("HomeScreen Component", () => {
  it("renders the Home Screen text", () => {
    render(
      <ComponentTestWrapper>
        <HomeScreen />
      </ComponentTestWrapper>,
    );

    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See All" })).toBeInTheDocument();
  });

  it("renders order list", () => {
    render(
      <ComponentTestWrapper>
        <HomeScreen count={3} />
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("Order List")).toBeInTheDocument();
  });
});
