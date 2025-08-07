import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import ServiceCard from "../index.tsx";
import {
  mockDraftService,
  mockPendingService,
} from "../../../mocks/service.ts";

describe("ServiceCard ", () => {
  const mockOnOpen = vi.fn();

  it("renders details correctly", () => {
    const { getByText } = render(
      <ServiceCard onOpen={mockOnOpen} data={mockPendingService} />,
    );

    expect(getByText(mockPendingService.title)).toBeInTheDocument();
    expect(getByText("Package Weight:")).toBeInTheDocument();
    expect(getByText("Package type:")).toBeInTheDocument();
  });

  it("hide package type when empty", () => {
    const { getByText, queryByText } = render(
      <ServiceCard onOpen={mockOnOpen} data={mockDraftService} />,
    );

    expect(getByText(mockDraftService.title)).toBeInTheDocument();
    expect(queryByText("Package type:")).toBeNull();
  });
});
