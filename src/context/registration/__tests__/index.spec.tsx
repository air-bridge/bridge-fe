import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RegistrationContextProvider } from "../index.tsx";

describe("RegistrationContext Provider", () => {
  it("should render component with provider", () => {
    const { getByText } = render(
      <RegistrationContextProvider>
        <p>Registration component</p>
      </RegistrationContextProvider>,
    );

    expect(getByText("Registration component")).toBeInTheDocument();
  });
});
