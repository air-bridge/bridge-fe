import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { EditOrderScreen } from "../index.tsx";

describe("Edit Order Screen", () => {
  it("renders the Edit Order Screen", () => {
    const { getByText } = render(<EditOrderScreen />);

    expect(getByText("Edit Order")).toBeInTheDocument();
  });
});
