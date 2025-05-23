import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeScreen from "../index.tsx";

describe("HomeScreen Component", () => {
  it("renders the Home Screen text", () => {
    render(<HomeScreen />);
    expect(screen.getByText("Home Screen")).toBeInTheDocument();
  });
});
