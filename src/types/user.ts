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

export type NotificationsFormValues = {
  inApp: boolean;
  email: boolean;
  sms: boolean;
};

export type Profile = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  phone: string;
  country_code: string;
  state: string;
  role: string;
};
