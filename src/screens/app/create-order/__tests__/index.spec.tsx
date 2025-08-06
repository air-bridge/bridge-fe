import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CreateOrderScreen } from "../index.tsx";

describe("Create Order Screen", () => {
  it("renders the Create Order Screen", () => {
    const { getByText } = render(<CreateOrderScreen />);

    expect(getByText("Create Order")).toBeInTheDocument();
  });
});
