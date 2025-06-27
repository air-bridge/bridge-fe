import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyOrder } from "../EmptyOrder.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Empty Parcels Component", () => {
  it("renders empty component", () => {
    render(
      <ComponentTestWrapper>
        <EmptyOrder />
      </ComponentTestWrapper>,
    );

    expect(
      screen.getByText("You do not have any order yet"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create Order" }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("empty order")).toHaveAttribute("width", "290");
  });

  it("renders empty component in mobile", () => {
    render(
      <ComponentTestWrapper>
        <EmptyOrder mobile />
      </ComponentTestWrapper>,
    );

    expect(
      screen.getByText("You do not have any order yet"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create Order" }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("empty order")).toHaveAttribute("width", "180");
  });
});
