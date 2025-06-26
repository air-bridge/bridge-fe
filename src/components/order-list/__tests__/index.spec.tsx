import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderList } from "../index.tsx";

describe("Order List Component", () => {
  beforeEach(() => {
    render(<OrderList />);
  });

  it("renders Order List", () => {
    expect(screen.getByText("Order List")).toBeInTheDocument();
  });
});
