import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Account from "../index.tsx";

describe("Account Component", () => {
  it("renders the Account text", () => {
    render(<Account />);
    expect(screen.getByText("Registration & Login")).toBeInTheDocument();
  });
});
