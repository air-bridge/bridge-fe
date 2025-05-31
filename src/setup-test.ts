import "@testing-library/jest-dom/vitest";
import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as ReactRouterDom from "react-router-dom";

const mockedUseNavigate = vi.fn();
const mockedUseLocation = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual: typeof ReactRouterDom =
    await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
    useLocation: () => mockedUseLocation,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

// Mock media query hook
vi.mock("@mui/material/useMediaQuery", async () => {
  return {
    default: () => {
      return false;
    },
  };
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-ignore
global.ResizeObserver = ResizeObserver;
