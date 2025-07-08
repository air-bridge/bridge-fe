export type RegistrationFormValues = {
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

export type UserAuth = {
  refresh_token: string;
  token: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
};

export type UserAuthField = Record<keyof UserAuth, string>;
