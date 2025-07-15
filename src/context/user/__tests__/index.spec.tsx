import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { UserContextProvider } from "../index.tsx";
import { mockUserProfile } from "../../../mocks/user.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../../../api/user.ts", () => ({
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
}));

const queryClient = new QueryClient();

describe("UserContext Provider", () => {
  it("should render component with provider", () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <p>User component</p>
        </UserContextProvider>
      </QueryClientProvider>,
    );

    expect(getByText("User component")).toBeInTheDocument();
  });
});
