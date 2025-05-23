import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InternalError from "../index.tsx";

describe("InternalError", () => {
  it("InternalError Component", () => {
    render(<InternalError />);

    expect(
      screen.getByText("Error encountered: Please reload the page"),
    ).toBeInTheDocument();
  });
});
