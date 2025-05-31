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
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  userName: string;
  fullName: string;
  roleName: string;
  phoneNumber: string;
};
