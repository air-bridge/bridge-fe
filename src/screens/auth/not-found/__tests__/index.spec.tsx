import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFoundScreen from "../index.tsx";

describe("NotFoundScreen Component", () => {
  beforeEach(() => {
    render(<NotFoundScreen />);
  });

  it("renders the NotFoundScreen component", () => {
    expect(screen.getByText("Not found")).toBeInTheDocument();
  });
});
