import { ErrorCodes } from "../components/signin/constant.ts";

export type RegistrationFormValues = {
  terms: boolean;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type SetPasswordFormValues = {
  email?: string;
  new_password: string;
  confirm_new_password: string;
  current_password?: string | null;
};

export type UserAuth = {
  user_id: number;
  refresh_token: string;
  token: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  current_role: string;
};

export type APIResponse = {
  data: unknown;
  message: string;
  error?: {
    code: ErrorCodes;
    message: string;
  };
};
