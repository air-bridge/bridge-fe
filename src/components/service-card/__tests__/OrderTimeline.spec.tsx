import { describe, expect, beforeEach, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceTimeline } from "../ServiceTimeline.tsx";
import { mockOpenOrder } from "../../../mocks/order.ts";

describe("OrderTimeline ", () => {
  beforeEach(() => {
    render(<ServiceTimeline order={mockOpenOrder} />);
  });

  it("renders details correctly", () => {
    expect(
      screen.getByText(
        `${mockOpenOrder.pickup_state}, ${mockOpenOrder.pickup_country}`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(mockOpenOrder.created_at)).toBeInTheDocument();
    expect(screen.getByText("1 way trip")).toBeInTheDocument();
    expect(screen.getByText("Lagos")).toBeInTheDocument();
  });
});
