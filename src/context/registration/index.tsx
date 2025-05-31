import { PropsWithChildren, useState } from "react";
import { initialPayload, RegistrationContext } from "./util.ts";
import { RegistrationInput } from "../../types/user.ts";

export const RegistrationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [payload, setPayload] = useState(initialPayload);
  const handlePayload = (arg: RegistrationInput) => {
    setPayload({
      ...payload,
      ...arg,
    });
  };

  return (
    <RegistrationContext.Provider
      value={{ payload, setRegistrationInfo: handlePayload }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
