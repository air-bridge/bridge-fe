import "@testing-library/jest-dom/vitest";
import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as ReactRouterDom from "react-router-dom";
import * as countryStateCity from "country-state-city";
import * as reactQuery from "@tanstack/react-query";

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

// Tanstack Query
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<typeof reactQuery>(
    "@tanstack/react-query",
  );
  return {
    ...actual,
    useQuery: (options: any) => actual.useQuery({ ...options, retry: false }),
  };
});

// Lottie
vi.mock("lottie-react", () => {
  return {
    default: ({ children }: { children: unknown }) => children,
  };
});

// Country state option
vi.mock("country-state-city", async () => {
  const actual =
    await vi.importActual<typeof countryStateCity>("country-state-city");

  return {
    ...actual,
    Country: {
      getAllCountries: vi.fn().mockReturnValue([
        { name: "Nigeria", isoCode: "NG" },
        { name: "Germany", isoCode: "DE" },
        { name: "Indonesia", isoCode: "" },
      ]),
    },
    State: {
      getStatesOfCountry: vi.fn().mockImplementation((code: string) => {
        if (code === "NG") {
          return [
            { name: "Lagos", isoCode: "LA" },
            { name: "Abuja", isoCode: "FC" },
          ];
        }
        return [];
      }),
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
