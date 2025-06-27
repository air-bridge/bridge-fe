import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../AppLayout.tsx";
import * as ReactRouterDom from "react-router-dom";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual: typeof ReactRouterDom =
    await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
    useLocation: () => ({
      pathname: "/",
    }),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

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
