import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Screen Header", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <Header />
      </ComponentTestWrapper>,
    );
  });

  it("should render component", () => {
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Switch to Passenger" }),
    ).toBeInTheDocument();
  });
});
