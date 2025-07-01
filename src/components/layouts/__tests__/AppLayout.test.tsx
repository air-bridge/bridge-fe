import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../AppLayout.tsx";
import * as ReactRouterDom from "react-router-dom";
import * as userAuth from "../../../utils/userAuth";
import { mockUserAuth } from "../../../mocks/user.ts";

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
    useLocation: vi.fn(),
  };
});

vi.mock("../../../utils/userAuth", () => ({
  getAuthUser: vi.fn(),
}));

const makeLocation = (pathname: string) => ({
  pathname,
  state: null,
  key: "test-key",
  search: "",
  hash: "",
});

describe("AppLayout", () => {
  const mockedUseLocation = vi.mocked(ReactRouterDom.useLocation);
  const mockedGetAuthUser = vi.mocked(userAuth.getAuthUser);

  beforeEach(() => {
    mockedUseLocation.mockReturnValue(makeLocation("/"));
    mockedGetAuthUser.mockReturnValue(mockUserAuth);
  });

  it("renders the Outlet content with Header for normal path", () => {
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
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("renders only Outlet for full screen path (no Header)", () => {
    mockedUseLocation.mockReturnValue(makeLocation("/create-order"));

    render(
      <MemoryRouter initialEntries={["/create-order"]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/create-order" element={<div>Screen Component</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Screen Component")).toBeInTheDocument();
    expect(screen.queryByAltText("logo")).not.toBeInTheDocument();
  });

  it("redirects to /account if user is not authenticated", () => {
    mockedGetAuthUser.mockReturnValue(undefined);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<div>Screen Component</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(mockedUseNavigate).toHaveBeenCalledWith("/account");
  });
});
