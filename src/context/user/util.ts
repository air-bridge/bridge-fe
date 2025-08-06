import { createContext, useContext } from "react";
import { Profile } from "../../types/user.ts";

type Props = {
  currentUser?: Profile;
  isSender: boolean | null;
  isPassenger: boolean | null;
  refetchProfile: () => void;
};

export const UserContext = createContext<Props>({
  isSender: null,
  isPassenger: null,
  refetchProfile: () => {},
});

export const useUserContext = () => useContext(UserContext);
