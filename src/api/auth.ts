import {
  APIResponse,
  LoginFormValues,
  SetPasswordFormValues,
  UserAuth,
} from "../types/auth.ts";
import { postAPI } from "./api.ts";
import { RegistrationPayload } from "../types/user.ts";
import { ErrorCodes } from "../components/signin/constant.ts";
import { getAuthUser, setUserAuth } from "../utils/userAuth.ts";

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
  const res = await postAPI("users/reset-password", payload, false);

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
  const res = await postAPI("users/send-otp", { email }, false);

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

export const verifyOTP = async (code: string, email: string | undefined) => {
  const res = await postAPI("users/verify-otp", { code, email }, false);

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

export const activateUser = async (code: string, email: string | undefined) => {
  const res = await postAPI("users/activate", { code, email }, false);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Account activation failed. Please try again!",
    );
  }

  return (await res.json()) as { isSuccess: boolean };
};

export const switchRole = async (role: string) => {
  const res = await postAPI("users/role-switch", { role });

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Account activation failed. Please try again!",
    );
  }

  const response: {
    data: {
      current_role: string;
      firstname: string;
      lastname: string;
      token?: string;
    };
  } = await res.json();

  // Update auth
  const authUser = getAuthUser();
  if (response.data.token && authUser) {
    setUserAuth({
      ...authUser,
      token: response.data.token,
    });
  }
  return response.data;
};
