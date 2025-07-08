import { createContext, useContext } from "react";
import { UserAuth, UserAuthField } from "../../types/auth.ts";

type Props = {
  currentUser?: UserAuth;
  isSender: boolean;
  updateUserAuthInfo: (arg: UserAuthField) => void;
};

export const UserContext = createContext<Props>({
  isSender: true,
  updateUserAuthInfo: () => {},
});

export const useUserContext = () => useContext(UserContext);
