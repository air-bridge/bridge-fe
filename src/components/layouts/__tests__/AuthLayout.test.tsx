import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthLayout from "../AuthLayout.tsx";

describe("AuthLayout", () => {
  it("AuthLayout Component", () => {
    render(<AuthLayout />);

    expect(screen.getByText("AuthLayout")).toBeInTheDocument();
  });
});
