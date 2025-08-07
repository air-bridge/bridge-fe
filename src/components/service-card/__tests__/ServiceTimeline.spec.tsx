import { describe, expect, beforeEach, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceTimeline } from "../ServiceTimeline.tsx";
import { mockOpenService } from "../../../mocks/service.ts";

describe("Service Timeline", () => {
  beforeEach(() => {
    render(<ServiceTimeline data={mockOpenService} />);
  });

  it("renders details correctly", () => {
    expect(screen.getByText(mockOpenService.arrival_city)).toBeInTheDocument();
    expect(screen.getByText(mockOpenService.created_at)).toBeInTheDocument();
    expect(screen.getByText("1 way trip")).toBeInTheDocument();
    expect(screen.getByText("Lagos")).toBeInTheDocument();
  });
});
