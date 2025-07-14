import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignInForm } from "../SignInForm.tsx";
import { mockUserAuth } from "../../../mocks/user.ts";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import * as ReactRouterDom from "react-router-dom";
import * as api from "../../../api/auth.ts";
import { ErrorCodes } from "../constant.ts";

vi.mock("../../../api/auth.ts", () => ({
  login: vi.fn(() => Promise.resolve({ data: mockUserAuth })),
}));

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual: typeof ReactRouterDom =
    await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Sign-In form component", () => {
  const mockHandleVerifyStatus = vi.fn();

  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <SignInForm handleVerifyStatus={mockHandleVerifyStatus} />
      </ComponentTestWrapper>,
    );
  });

  it("should update sign-in input fields correctly", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test1@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    expect(screen.getByPlaceholderText("Email")).toHaveValue("test1@mail.com");
    expect(screen.getByPlaceholderText("Password")).toHaveValue("password");
  });

  it("should show form validation errors", async () => {
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("should submit form", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("show error for failed API request", async () => {
    vi.mocked(api.login).mockRejectedValue(
      new Error("Invalid credentials, please try again."),
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(
        screen.getByText("Invalid credentials, please try again."),
      ).toBeInTheDocument();
    });
  });

  it.only("handles error for unverified account", async () => {
    vi.mocked(api.login).mockRejectedValue(
      new Error(ErrorCodes.EMAIL_NOT_VERIFIED),
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(mockHandleVerifyStatus).toHaveBeenCalledOnce();
    });
  });
});
