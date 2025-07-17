import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyService } from "../EmptyService.tsx";
import {
  ComponentTestWrapper,
  spyOnMediaQuery,
} from "../../../config/tests/utils.tsx";
import * as useMediaQuery from "@mui/material/useMediaQuery";

describe("EmptyService Component", () => {
  it("renders empty component", () => {
    render(
      <ComponentTestWrapper>
        <EmptyService />
      </ComponentTestWrapper>,
    );

    expect(
      screen.getByText("You do not have any service yet"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create service" }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("empty service")).toHaveAttribute(
      "width",
      "290",
    );
  });
});

describe("EmptyService Component - Mobile", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
  });

  it("renders empty component in mobile", () => {
    render(
      <ComponentTestWrapper>
        <EmptyService />
      </ComponentTestWrapper>,
    );

    expect(
      screen.getByText("You do not have any service yet"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create service" }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("empty service")).toHaveAttribute(
      "width",
      "180",
    );
  });
});

describe("EmptyService useMediaQuery callback coverage", () => {
  it("should execute the useMediaQuery callback", () => {
    const mockDown = vi.fn().mockReturnValue(false);
    spyOnMediaQuery(mockDown);

    render(
      <ComponentTestWrapper>
        <EmptyService />
      </ComponentTestWrapper>,
    );
    expect(mockDown).toHaveBeenCalledWith("lg");
  });
});
