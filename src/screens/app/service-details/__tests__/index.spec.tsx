import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { OrderDetailsScreen } from "../index.tsx";

describe("Order Details Screen", () => {
  it("renders the Order Details Screen", () => {
    const { getByText } = render(<OrderDetailsScreen />);

    expect(getByText("Create Order")).toBeInTheDocument();
  });
});
