import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceList } from "../index.tsx";
import { orders } from "../../../mocks/order.ts";

describe("Service List Component", () => {
  beforeEach(() => {
    render(<ServiceList orders={orders} />);
  });

  it("renders Service List", () => {
    expect(screen.getByText(orders[0].title)).toBeInTheDocument();
    expect(screen.getByText(orders[1].title)).toBeInTheDocument();
    expect(screen.getByText(orders[2].title)).toBeInTheDocument();
  });
});
