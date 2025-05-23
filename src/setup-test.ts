import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
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
