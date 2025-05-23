import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Register from "../index.tsx";

describe("Register Component", () => {
  beforeEach(() => {
    render(<Register />);
  });

  it("renders the Register component", () => {
    expect(screen.getByText("Register")).toBeInTheDocument();
  });
});
