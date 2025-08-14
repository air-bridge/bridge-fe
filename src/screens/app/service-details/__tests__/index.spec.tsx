import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ServiceDetailsScreen } from "../index.tsx";

describe("Service Details Screen", () => {
  it("renders the Service Details Screen", () => {
    const { getByText } = render(<ServiceDetailsScreen />);

    expect(getByText("Create Service")).toBeInTheDocument();
  });
});
