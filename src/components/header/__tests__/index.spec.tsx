import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Header } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Screen Header", () => {
  it("should render component", () => {
    const { getByAltText, getByRole } = render(
      <ComponentTestWrapper>
        <Header />
      </ComponentTestWrapper>,
    );

    expect(getByAltText("logo")).toBeInTheDocument();
    expect(
      getByRole("button", { name: "Switch to Passenger" }),
    ).toBeInTheDocument();
  });

  it("should render component on mobile", () => {
    const { getByTestId, getByAltText, queryByRole } = render(
      <ComponentTestWrapper>
        <Header mobile />
      </ComponentTestWrapper>,
    );

    expect(getByAltText("logo")).toBeInTheDocument();
    expect(getByTestId("SwapHorizIcon")).toBeInTheDocument();
    expect(queryByRole("button", { name: "Switch to Passenger" })).toBeNull();
  });
});
