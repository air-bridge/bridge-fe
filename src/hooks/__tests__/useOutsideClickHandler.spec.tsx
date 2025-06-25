import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import OutsideClickHandler from "../useOutsideClickHandler.tsx";

describe("Profile Card", () => {
  const mockOnClickHandler = vi.fn();

  beforeEach(() => {
    render(
      <div>
        <OutsideClickHandler onOutsideClick={mockOnClickHandler}>
          <div data-testid="inside-element">Inside</div>
        </OutsideClickHandler>
        <div data-testid="outside-element">Outside</div>
      </div>,
    );
  });

  it("should render component", () => {
    expect(screen.getByText("Inside")).toBeInTheDocument();
    expect(screen.getByText("Outside")).toBeInTheDocument();
  });

  it("calls onOutsideClick handler", () => {
    fireEvent.mouseDown(screen.getByTestId("inside-element"));
    expect(mockOnClickHandler).toHaveBeenCalledTimes(0);

    fireEvent.mouseDown(screen.getByTestId("outside-element"));
    expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
  });
});
