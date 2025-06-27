import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeScreen from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";

describe("HomeScreen Component", () => {
  it("renders the Home Screen text with no order", () => {
    render(
      <ComponentTestWrapper>
        <HomeScreen />
      </ComponentTestWrapper>,
    );

    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "See All" })).toBeNull();
  });

  it("renders the Home Screen text with orders", () => {
    render(
      <ComponentTestWrapper>
        <HomeScreen count={3} />
      </ComponentTestWrapper>,
    );

    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See All" })).toBeInTheDocument();
  });
});
