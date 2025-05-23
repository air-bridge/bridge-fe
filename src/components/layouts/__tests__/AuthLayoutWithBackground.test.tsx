import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthLayout from "../AuthLayout.tsx";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as ReactRouterDom from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual: typeof ReactRouterDom =
    await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      pathname: "/auth/account",
    }),
  };
});

describe("AuthLayout With Background", () => {
  it("renders with background image when pathname matches pathWithBackground", () => {
    render(
      <MemoryRouter initialEntries={["/auth/account"]}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route
              path="/auth/account"
              element={<div>Background Image Content</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Background Image Content")).toBeInTheDocument();
    const logoWhiteImage = screen.getByAltText("logo");
    expect(logoWhiteImage).toHaveAttribute(
      "src",
      expect.stringContaining("logo-white.png"),
    );
  });
});
