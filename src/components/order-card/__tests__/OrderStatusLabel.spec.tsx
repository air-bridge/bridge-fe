import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { OrderStatusLabel } from "../OrderStatusLabel.tsx";
import { OrderStatus } from "../../../types/order.ts";

describe("Screen Header", () => {
  it("renders chip with correct label and color for draft status", () => {
    const { getByText } = render(
      <OrderStatusLabel status={OrderStatus.Draft} />,
    );
    const chip = getByText(OrderStatus.Draft);
    expect(chip).toBeInTheDocument();
    expect(chip.parentElement).toHaveClass("MuiChip-colorSecondary");
  });

  it("renders chip with correct label and color for open status", () => {
    const { getByText } = render(
      <OrderStatusLabel status={OrderStatus.Open} />,
    );
    const chip = getByText(OrderStatus.Open);
    expect(chip).toBeInTheDocument();
    expect(chip.parentElement).toHaveClass("MuiChip-colorSuccess");
  });

  it("renders chip with correct label and color for pending status", () => {
    const { getByText } = render(
      <OrderStatusLabel status={OrderStatus.Pending} />,
    );
    const chip = getByText(OrderStatus.Pending);
    expect(chip).toBeInTheDocument();
    expect(chip.parentElement).toHaveClass("MuiChip-colorWarning");
  });

  it("renders chip with correct label and color for requested status", () => {
    const { getByText } = render(
      <OrderStatusLabel status={OrderStatus.Requested} />,
    );
    const chip = getByText(OrderStatus.Requested);
    expect(chip).toBeInTheDocument();
    expect(chip.parentElement).toHaveClass("MuiChip-colorWarning");
  });
});
