import { describe, expect, beforeEach, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderTimeline } from "../OrderTimeline.tsx";
import { mockOpenOrder } from "../../../mocks/order.ts";

describe("OrderTimeline ", () => {
  beforeEach(() => {
    render(<OrderTimeline order={mockOpenOrder} />);
  });

  it("renders details correctly", () => {
    expect(screen.getByText(mockOpenOrder.origin)).toBeInTheDocument();
    expect(screen.getByText(mockOpenOrder.createdAt)).toBeInTheDocument();
    expect(screen.getByText(mockOpenOrder.tripType)).toBeInTheDocument();
    expect(screen.getByText(mockOpenOrder.destination)).toBeInTheDocument();
  });
});
