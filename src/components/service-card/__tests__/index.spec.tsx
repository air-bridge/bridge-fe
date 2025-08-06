import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { mockDraftOrder, mockPendingOrder } from "../../../mocks/order.ts";
import OrderCard from "../index.tsx";

describe("OrderCard ", () => {
  it("renders details correctly", () => {
    const { getByText } = render(<OrderCard order={mockPendingOrder} />);

    expect(getByText(mockPendingOrder.title)).toBeInTheDocument();
    expect(getByText("Package Weight:")).toBeInTheDocument();
    expect(getByText("Package type:")).toBeInTheDocument();
  });

  it("hide package type when empty", () => {
    const { getByText, queryByText } = render(
      <OrderCard order={mockDraftOrder} />,
    );

    expect(getByText(mockDraftOrder.title)).toBeInTheDocument();
    expect(queryByText("Package type:")).toBeNull();
  });
});
