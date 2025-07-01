import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyOrder } from "../EmptyOrder.tsx";
import {
  ComponentTestWrapper,
  spyOnMediaQuery,
} from "../../../config/tests/utils.tsx";
import * as useMediaQuery from "@mui/material/useMediaQuery";

describe("EmptyOrder Component", () => {
  it("renders empty component", () => {
    render(
      <ComponentTestWrapper>
        <EmptyOrder />
      </ComponentTestWrapper>,
    );

    expect(
      screen.getByText("You do not have any order yet"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create Order" }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("empty order")).toHaveAttribute("width", "290");
  });
});

describe("EmptyOrder Component - Mobile", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
  });

  it("renders empty component in mobile", () => {
    render(
      <ComponentTestWrapper>
        <EmptyOrder />
      </ComponentTestWrapper>,
    );

    expect(
      screen.getByText("You do not have any order yet"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create Order" }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("empty order")).toHaveAttribute("width", "180");
  });
});

describe("EmptyOrder useMediaQuery callback coverage", () => {
  it("should execute the useMediaQuery callback", () => {
    const mockDown = vi.fn().mockReturnValue(false);
    spyOnMediaQuery(mockDown);

    render(
      <ComponentTestWrapper>
        <EmptyOrder />
      </ComponentTestWrapper>,
    );
    expect(mockDown).toHaveBeenCalledWith("lg");
  });
});
