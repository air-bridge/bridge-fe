import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { UserContextProvider } from "../index.tsx";

describe("UserContext Provider", () => {
  it("should render component with provider", () => {
    const { getByText } = render(
      <UserContextProvider>
        <p>User component</p>
      </UserContextProvider>,
    );

    expect(getByText("User component")).toBeInTheDocument();
  });
});
