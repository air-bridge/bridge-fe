import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ServiceCard from "../index.tsx";
import {
  mockDraftService,
  mockMatchedService,
} from "../../../mocks/service.ts";

describe("ServiceCard ", () => {
  it("renders details correctly", () => {
    const { getByText } = render(<ServiceCard data={mockMatchedService} />);

    expect(getByText(mockMatchedService.title)).toBeInTheDocument();
    expect(getByText("Package Weight:")).toBeInTheDocument();
    expect(getByText("Package type:")).toBeInTheDocument();
  });

  it("hide package type when empty", () => {
    const { getByText, queryByText } = render(
      <ServiceCard data={mockDraftService} />,
    );

    expect(getByText(mockDraftService.title)).toBeInTheDocument();
    expect(queryByText("Package type:")).toBeNull();
  });
});
