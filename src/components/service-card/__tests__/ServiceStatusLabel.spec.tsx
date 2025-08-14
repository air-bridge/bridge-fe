import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { ServiceStatusLabel } from "../ServiceStatusLabel.tsx";
import { ServiceStatus } from "../../../types/service.ts";

describe("Screen Header", () => {
  it("renders chip with correct label and color for draft status", () => {
    const { getByText } = render(
      <ServiceStatusLabel status={ServiceStatus.Draft} />,
    );
    const chip = getByText(ServiceStatus.Draft);
    expect(chip).toBeInTheDocument();
    expect(chip.parentElement).toHaveClass("MuiChip-colorSecondary");
  });

  it("renders chip with correct label and color for open status", () => {
    const { getByText } = render(
      <ServiceStatusLabel status={ServiceStatus.Open} />,
    );
    const chip = getByText(ServiceStatus.Open);
    expect(chip).toBeInTheDocument();
    expect(chip.parentElement).toHaveClass("MuiChip-colorSuccess");
  });

  it("renders chip with correct label and color for pending status", () => {
    const { getByText } = render(
      <ServiceStatusLabel status={ServiceStatus.Open} />,
    );
    const chip = getByText(ServiceStatus.Open);
    expect(chip).toBeInTheDocument();
    expect(chip.parentElement).toHaveClass("MuiChip-colorWarning");
  });

  it("renders chip with correct label and color for requested status", () => {
    const { getByText } = render(
      <ServiceStatusLabel status={ServiceStatus.Completed} />,
    );
    const chip = getByText(ServiceStatus.Completed);
    expect(chip).toBeInTheDocument();
    expect(chip.parentElement).toHaveClass("MuiChip-colorWarning");
  });
});
