import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AccountTypeScreen from "../index.tsx";

describe("Account Type Screen", () => {
  it("renders the Account text", () => {
    render(<AccountTypeScreen />);
    expect(screen.getByText("Registration & Login")).toBeInTheDocument();
  });
});
