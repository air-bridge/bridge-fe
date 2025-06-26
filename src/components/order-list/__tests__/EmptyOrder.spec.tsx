import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyOrder } from "../EmptyOrder.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Empty Parcels Component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <EmptyOrder />
      </ComponentTestWrapper>,
    );
  });

  it("renders empty component", () => {
    expect(
      screen.getByText("You do not have any order yet"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create Order" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("empty order")).toBeInTheDocument();
  });
});
