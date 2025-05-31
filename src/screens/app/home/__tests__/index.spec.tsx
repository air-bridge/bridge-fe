import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeScreen from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";

describe("HomeScreen Component", () => {
  it("renders the Home Screen text", () => {
    render(
      <ComponentTestWrapper>
        <HomeScreen />
      </ComponentTestWrapper>,
    );
    expect(
      screen.getByRole("heading", { name: "Welcome Back," }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
  });
});
