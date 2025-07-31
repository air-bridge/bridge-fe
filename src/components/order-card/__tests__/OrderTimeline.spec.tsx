import { describe, expect, beforeEach, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderTimeline } from "../OrderTimeline.tsx";
import { mockOpenOrder } from "../../../mocks/order.ts";

describe("OrderTimeline ", () => {
  beforeEach(() => {
    render(<OrderTimeline order={mockOpenOrder} />);
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
