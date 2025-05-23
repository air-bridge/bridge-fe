import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthLayout from "../AuthLayout.tsx";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("AuthLayout", () => {
  it("renders without background image", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<div>Background Image Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Background Image Content")).toBeInTheDocument();
    const logoWhiteImage = screen.queryByAltText("logo");

    expect(logoWhiteImage).toHaveAttribute(
      "src",
      expect.stringContaining("logo.png"),
    );
  });
});
