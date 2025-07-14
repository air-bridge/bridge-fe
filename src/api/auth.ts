import {
  APIResponse,
  LoginFormValues,
  SetPasswordFormValues,
  UserAuth,
} from "../types/auth.ts";
import { postAPI } from "./api.ts";
import { RegistrationPayload } from "../types/user.ts";
import { ErrorCodes } from "../components/signin/constant.ts";

export const login = async (payload: LoginFormValues) => {
  const res = await postAPI("users/login", payload, false);

  if (!res.ok) {
    const errorData = (await res.json()) as APIResponse;

    if (errorData.error?.code === ErrorCodes.EMAIL_NOT_VERIFIED) {
      throw new Error(ErrorCodes.EMAIL_NOT_VERIFIED);
    } else {
      throw new Error(
        errorData.message || "Invalid credentials, please try again.",
      );
    }
  }

  return (await res.json()) as { data: UserAuth };
};

export const register = async (payload: RegistrationPayload) => {
  const res = await postAPI("users/signup", payload, false);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Registration failed, please try again!",
    );
  }

  const response: {
    data: { refresh_token: string; token: string };
  } = await res.json();

  return {
    refresh_token: response.data.refresh_token,
    token: response.data.token,
    firstname: payload.firstname,
    lastname: payload.lastname,
    role: payload.role,
    email: payload.email,
  };
};

export const setNewPassword = async (payload: SetPasswordFormValues) => {
  const res = await postAPI("users/set-password", payload);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Password reset failed. Please try again!",
    );
  }

  return (await res.json()) as { isSuccess: boolean };
};

export const sendOTP = async (email: string) => {
  const res = await postAPI("users/send-otp", { email });

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Unable to send OTP. Please try again!",
    );
  }

  return (await res.json()) as { isSuccess: boolean };
};

export const verifyOTP = async (code: string) => {
  const res = await postAPI("users/verify-otp", { code });

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "OTP verification reset failed. Please try again!",
    );
  }

  return (await res.json()) as { isSuccess: boolean };
};
