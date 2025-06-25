import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomepageTabs } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("HomeScreen Component", () => {
  it("renders the Home Screen text", () => {
    render(
      <ComponentTestWrapper>
        <HomepageTabs />
      </ComponentTestWrapper>,
    );

    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument();
  });
});
