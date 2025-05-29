import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Account from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";

describe("Account Component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <Account />,
      </ComponentTestWrapper>,
    );
  });

  it("renders the login form when activeTab is LOGIN", () => {
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });
});
