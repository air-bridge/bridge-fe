import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderList } from "../index.tsx";
import { orders } from "../../../mocks/order.ts";

describe("Order List Component", () => {
  beforeEach(() => {
    render(<OrderList orders={orders} />);
  });

  it("renders Order List", () => {
    expect(screen.getByText(orders[0].title)).toBeInTheDocument();
    expect(screen.getByText(orders[1].title)).toBeInTheDocument();
    expect(screen.getByText(orders[2].title)).toBeInTheDocument();
  });
});
