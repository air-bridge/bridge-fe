import { createContext, useContext } from "react";
import { Profile } from "../../types/user.ts";

type Props = {
  currentUser?: Profile;
  isSender: boolean;
  refetchProfile: () => void;
};

export const UserContext = createContext<Props>({
  isSender: true,
  refetchProfile: () => {},
});

export const useUserContext = () => useContext(UserContext);
