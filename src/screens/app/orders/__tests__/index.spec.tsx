import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OrdersScreen from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";

describe("HomeScreen Component", () => {
  it("renders the Home Screen text", () => {
    render(
      <ComponentTestWrapper>
        <OrdersScreen />
      </ComponentTestWrapper>,
    );
    expect(screen.getByText("Orders")).toBeInTheDocument();
  });
});
