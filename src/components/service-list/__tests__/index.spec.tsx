import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceList } from "../index.tsx";
import { mockServices } from "../../../mocks/service.ts";

describe("Service List Component", () => {
  beforeEach(() => {
    render(<ServiceList data={mockServices} />);
  });

  it("renders Service List", () => {
    expect(screen.getByText(mockServices[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockServices[1].title)).toBeInTheDocument();
    expect(screen.getByText(mockServices[2].title)).toBeInTheDocument();
  });
});
