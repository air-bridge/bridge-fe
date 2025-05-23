import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../index.tsx";

describe("Login Component", () => {
  it("renders the login text", () => {
    render(<Login />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
