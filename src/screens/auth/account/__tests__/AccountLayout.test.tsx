import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AccountLayout } from "../AccountLayout.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";

describe("Account Layout (With Background)", () => {
  it("renders screen component with background", () => {
    render(
      <ComponentTestWrapper>
        <AccountLayout showBackgroundImage>Screen Component</AccountLayout>
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("Screen Component")).toBeInTheDocument();
    const logo = screen.queryByAltText("logo");
    expect(logo).toHaveAttribute(
      "src",
      expect.stringContaining("logo-white.png"),
    );
  });

  it("renders screen component without background", () => {
    render(
      <ComponentTestWrapper>
        <AccountLayout showBackgroundImage={false}>
          Screen Component
        </AccountLayout>
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("Screen Component")).toBeInTheDocument();
    const logo = screen.queryByAltText("logo");
    expect(logo).toHaveAttribute("src", expect.stringContaining("logo.png"));
  });
});
