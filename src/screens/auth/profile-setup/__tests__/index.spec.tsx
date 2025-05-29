import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Account from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";

describe("Account Component", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <Account />
      </ComponentTestWrapper>,
    );
  });

  it("renders the headings", () => {
    expect(screen.getByText("Profile Registration")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We require your details to complete your account creation",
      ),
    ).toBeInTheDocument();
  });
});
