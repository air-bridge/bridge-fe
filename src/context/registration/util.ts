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
  firstname: "",
  lastname: "",
  phone: "",
  country_code: "",
  state: "",
  role: ACCOUNT_TYPE.Sender,
};

export const RegistrationContext = createContext<Props>({
  payload: initialPayload,
  setRegistrationInfo: () => {},
});

export const useRegistrationContext = () => useContext(RegistrationContext);
