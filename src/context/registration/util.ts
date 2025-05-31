import { createContext, useContext } from "react";
import { RegistrationInput, RegistrationPayload } from "../../types/user.ts";
import { ACCOUNT_TYPE } from "./constant.ts";

type Props = {
  payload: RegistrationPayload;
  setRegistrationInfo: (arg: RegistrationInput) => void;
};

export const initialPayload = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  country: "",
  state: "",
  accountType: ACCOUNT_TYPE.Sender,
};

export const RegistrationContext = createContext<Props>({
  payload: initialPayload,
  setRegistrationInfo: () => {},
});

export const useRegistrationContext = () => useContext(RegistrationContext);
