import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CreateServiceScreen } from "../index.tsx";

describe("Create service Screen", () => {
  it("renders the Create Service Screen", () => {
    const { getByText } = render(<CreateServiceScreen />);

    expect(getByText("Create Service")).toBeInTheDocument();
  });
});
