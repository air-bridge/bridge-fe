import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { NotificationContextProvider } from "../index.tsx";

describe("RegistrationContext Provider", () => {
  it("should render component with provider", () => {
    const { getByText } = render(
      <NotificationContextProvider>
        <p>Notification child component</p>
      </NotificationContextProvider>,
    );

    expect(getByText("Notification child component")).toBeInTheDocument();
  });
});
