import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomepageTabs } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("HomepageTabs", () => {
  it("renders the tabs with action", () => {
    render(
      <ComponentTestWrapper>
        <HomepageTabs showAction />
      </ComponentTestWrapper>,
    );

    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create Order" }),
    ).toBeInTheDocument();
  });

  it("renders the tabs with no action", () => {
    render(
      <ComponentTestWrapper>
        <HomepageTabs showAction={false} />
      </ComponentTestWrapper>,
    );

    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Create Order" })).toBeNull();
  });
});
