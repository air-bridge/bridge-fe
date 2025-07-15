import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { OTPForm } from "../index.tsx";
import {
  ComponentTestWrapper,
  spyOnMediaQuery,
} from "../../../config/tests/utils.tsx";
import * as ReactRouterDom from "react-router-dom";
import * as userAuth from "../../../utils/userAuth.ts";
import * as api from "../../../api/auth.ts";
import { mockUserAuth } from "../../../mocks/user.ts";
import * as useMediaQuery from "@mui/material/useMediaQuery";
import { RegistrationContext } from "../../../context/registration/util.ts";
import {
  ACCOUNT_TYPE,
  AccountAction,
} from "../../../context/registration/constant.ts";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual: typeof ReactRouterDom =
    await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock("../../../api/auth.ts", () => ({
  verifyOTP: vi.fn(() => Promise.resolve({ isSuccess: true })),
  activateUser: vi.fn(() => Promise.resolve({ isSuccess: true })),
}));

describe("OTP Form Component - Verify Action", () => {
  const mockOnNext = vi.fn();
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
    vi.spyOn(userAuth, "getAuthUser").mockReturnValue(mockUserAuth);
    render(
      <ComponentTestWrapper>
        <RegistrationContext.Provider
          value={{
            payload: mockPayload,
            setRegistrationInfo: mockHandlePayload,
          }}
        >
          <OTPForm action={AccountAction.VERIFY_OTP} onNext={mockOnNext} />
        </RegistrationContext.Provider>
      </ComponentTestWrapper>,
    );
  });

  it("should render correctly", () => {
    expect(screen.getByText("OTP Verification ?")).toBeInTheDocument();
    expect(
      screen.getByText("Type you 6 digit security code"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("user-email")).toBeInTheDocument();
  });

  it("should update input fields correctly", () => {
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });

    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
  });

  it("focuses next input field on valid input", () => {
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });

    expect(document.activeElement).toBe(inputs[1]);
  });

  it("does not update input field with invalid input", () => {
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "a" } });

    expect(inputs[0]).toHaveValue("");
  });

  it("focuses previous input field on backspace when empty", () => {
    const inputs = screen.getAllByRole("textbox");
    fireEvent.keyDown(inputs[1], { key: "Backspace" });

    expect(document.activeElement).toBe(inputs[0]);
  });

  it("submits OTP form successfully", async () => {
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) =>
      fireEvent.change(input, { target: { value: `${index + 1}` } }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledOnce();
    });
  });

  it("show error for failed API request", async () => {
    vi.mocked(api.verifyOTP).mockRejectedValue(
      new Error("OTP verification reset failed. Please try again!"),
    );

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) =>
      fireEvent.change(input, { target: { value: `${index + 1}` } }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(
        screen.getByText("OTP verification reset failed. Please try again!"),
      ).toBeInTheDocument();
    });
  });
});

describe("OTP Form Component - Activate User", () => {
  const mockOnNext = vi.fn();
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
    vi.spyOn(userAuth, "getAuthUser").mockReturnValue(mockUserAuth);
    render(
      <ComponentTestWrapper>
        <RegistrationContext.Provider
          value={{
            payload: mockPayload,
            setRegistrationInfo: mockHandlePayload,
          }}
        >
          <OTPForm action={AccountAction.ACTIVATE_USER} onNext={mockOnNext} />
        </RegistrationContext.Provider>
      </ComponentTestWrapper>,
    );
  });

  it("should render correctly", () => {
    expect(screen.getByText("OTP Verification ?")).toBeInTheDocument();
    expect(
      screen.getByText("Type you 6 digit security code"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("user-email")).toBeInTheDocument();
  });

  it("submits OTP form successfully", async () => {
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) =>
      fireEvent.change(input, { target: { value: `${index + 1}` } }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledOnce();
    });
  });

  it("show error for failed API request", async () => {
    vi.mocked(api.activateUser).mockRejectedValue(
      new Error("Account activation failed. Please try again!"),
    );

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) =>
      fireEvent.change(input, { target: { value: `${index + 1}` } }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(
        screen.getByText("Account activation failed. Please try again!"),
      ).toBeInTheDocument();
    });
  });
});

describe("OTP Form Component - Mobile", () => {
  const mockOnNext = vi.fn();
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
  });

  it("should update input fields correctly", () => {
    render(
      <ComponentTestWrapper>
        <OTPForm action={AccountAction.VERIFY_OTP} onNext={mockOnNext} />
      </ComponentTestWrapper>,
    );
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "4" } });
    fireEvent.change(inputs[1], { target: { value: "5" } });

    expect(inputs[0]).toHaveValue("4");
    expect(inputs[1]).toHaveValue("5");
  });
});

describe("OTP Form Component useMediaQuery callback coverage", () => {
  const mockOnNext = vi.fn();
  it("should execute the useMediaQuery callback", () => {
    const mockDown = vi.fn().mockReturnValue(false);
    spyOnMediaQuery(mockDown);

    render(
      <ComponentTestWrapper>
        <OTPForm action={AccountAction.VERIFY_OTP} onNext={mockOnNext} />
      </ComponentTestWrapper>,
    );

    expect(mockDown).toHaveBeenCalledWith("lg");
  });
});
