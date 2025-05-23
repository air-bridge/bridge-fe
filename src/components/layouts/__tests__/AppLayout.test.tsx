import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../AppLayout.tsx";

describe("AppLayout", () => {
  it("renders the Outlet content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<div>Screen Component</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Screen Component")).toBeInTheDocument();
  });
});
