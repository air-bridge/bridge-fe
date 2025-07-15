import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ForgotPasswordScreen from "../index.tsx";
import { ComponentTestWrapper } from "../../../../config/tests/utils.tsx";
import { ACCOUNT_TYPE } from "../../../../context/registration/constant.ts";
import { RegistrationContext } from "../../../../context/registration/util.ts";

vi.mock("../../../../api/auth.ts", () => ({
  setNewPassword: vi.fn(() => Promise.resolve({ isSuccess: true })),
  resetPassword: vi.fn(() => Promise.resolve({ isSuccess: true })),
  verifyOTP: vi.fn(() => Promise.resolve({ isSuccess: true })),
  sendOTP: vi.fn(() => Promise.resolve({ isSuccess: true })),
  activateUser: vi.fn(() => Promise.resolve({ isSuccess: true })),
}));

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
    useLocation: vi.fn(),
  };
});

describe("ForgotPasswordScreen Component", () => {
  const mockPayload = {
    email: "test@mail.com",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    country_code: "",
    state: "",
    role: ACCOUNT_TYPE.Sender,
  };

  const mockHandlePayload = vi.fn();

  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <RegistrationContext.Provider
          value={{
            payload: mockPayload,
            setRegistrationInfo: mockHandlePayload,
          }}
        >
          <ForgotPasswordScreen />
        </RegistrationContext.Provider>
      </ComponentTestWrapper>,
    );
  });

  it("renders Forgot password form", () => {
    expect(screen.getByText("Forgot Password ?")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your email to reset your password"),
    ).toBeInTheDocument();
  });

  it("renders OTP verification", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("OTP Verification ?")).toBeInTheDocument();
      expect(
        screen.getByText("Type you 6 digit security code"),
      ).toBeInTheDocument();
    });
  });

  it("renders set new password form", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input, index) =>
        fireEvent.change(input, { target: { value: `${index + 1}` } }),
      );
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Setup New Password")).toBeInTheDocument();
    });
  });

  it("should complete the change password flow", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test1@mail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input, index) =>
        fireEvent.change(input, { target: { value: `${index + 1}` } }),
      );
    });
    // OTP screen
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Setup New Password")).toBeInTheDocument();
    });
    // Set Password screen
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password@1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "Password@1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Password changed")).toBeInTheDocument();
      expect(
        screen.getByText(
          "You have Successfully updated password. Please login in to start exploring",
        ),
      ).toBeInTheDocument();
    });
  });
});

describe("ForgotPasswordScreen Back Button", () => {
  const mockPayload = {
    email: "test@mail.com",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    country_code: "",
    state: "",
    role: ACCOUNT_TYPE.Sender,
  };

  const mockHandlePayload = vi.fn();

  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <RegistrationContext.Provider
          value={{
            payload: mockPayload,
            setRegistrationInfo: mockHandlePayload,
          }}
        >
          <ForgotPasswordScreen />
        </RegistrationContext.Provider>
      </ComponentTestWrapper>,
    );
  });

  it("Request Forgot password screen", () => {
    fireEvent.click(screen.getByRole("button", { name: "Back" }));

    expect(mockedUseNavigate).toHaveBeenCalledWith("/account");
  });

  it("OTP verification screen", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("OTP Verification ?")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Back" }));

    expect(
      screen.getByText("Enter your email to reset your password"),
    ).toBeInTheDocument();
  });

  it("set new password screen", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input, index) =>
        fireEvent.change(input, { target: { value: `${index + 1}` } }),
      );
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Setup New Password")).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Back" }));
    });

    // Back to OTP screen
    expect(screen.getByText("OTP Verification ?")).toBeInTheDocument();
  });

  it("completed password screen", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test1@mail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input, index) =>
        fireEvent.change(input, { target: { value: `${index + 1}` } }),
      );
    });
    // OTP screen
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Setup New Password")).toBeInTheDocument();
    });
    // Set Password screen
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password@1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "Password@1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Password changed")).toBeInTheDocument();
      expect(
        screen.getByText(
          "You have Successfully updated password. Please login in to start exploring",
        ),
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByRole("button", { name: "Back" }),
    ).not.toBeInTheDocument();
  });
});
