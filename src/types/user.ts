export type ProfileFormValues = {
  firstname: string;
  lastname: string;
  phone: string;
  country_code: string;
  state: string;
};

export type RegistrationPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
} & ProfileFormValues;

export type RegistrationInput = Partial<
  Record<keyof RegistrationPayload, string>
>;
