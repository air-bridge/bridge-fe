export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  state: string;
};

export type RegistrationPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  accountType: string;
} & ProfileFormValues;

export type RegistrationInput = Partial<
  Record<keyof RegistrationPayload, string>
>;
