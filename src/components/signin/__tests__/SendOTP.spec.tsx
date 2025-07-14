import { describe, expect, it, beforeEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SendOTP } from "../SendOTP.tsx";
import * as api from "../../../api/auth.ts";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

vi.mock("../../../api/auth.ts", () => {
  return {
    sendOTP: vi.fn(() => Promise.resolve({ isSuccess: true })),
  };
});

describe("Send OTP Component", () => {
  const mockOnNext = vi.fn();
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <SendOTP onNext={mockOnNext} />
      </ComponentTestWrapper>,
    );
  });

  it("should render component", () => {
    expect(
      screen.getByRole("button", { name: "Send OTP" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Unverified Account")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please verify your account to gain full access to your account",
      ),
    ).toBeInTheDocument();
  });

  it("handles request successfully", async () => {
    fireEvent.click(screen.getByRole("button", { name: "Send OTP" }));

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledOnce();
    });
  });

  it("shows API error render component", async () => {
    vi.mocked(api.sendOTP).mockRejectedValue(
      new Error("Unable to send OTP. Please try again!"),
    );

    fireEvent.click(screen.getByRole("button", { name: "Send OTP" }));

    await waitFor(() => {
      expect(
        screen.getByText("Unable to send OTP. Please try again!"),
      ).toBeInTheDocument();
    });
  });
});
