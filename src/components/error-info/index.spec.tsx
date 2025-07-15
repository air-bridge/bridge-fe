import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorInfo } from "./index.tsx";

describe("ErrorInfo Component", () => {
  it("renders default error message when no message is provided", () => {
    render(<ErrorInfo />);
    expect(
      screen.getByText(
        "Please, refresh the page! We are to unable process your request!",
      ),
    ).toBeInTheDocument();
  });

  it("renders provided error message", () => {
    const customMessage = "An unexpected error occurred!";
    render(<ErrorInfo message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("renders error icon", () => {
    render(<ErrorInfo />);
    expect(screen.getByTestId("InfoIcon")).toBeInTheDocument();
  });
});
