import { PropsWithChildren, useCallback, useState } from "react";
import { getAuthUser, setUserAuth } from "../../utils/userAuth.ts";
import { UserAuth, UserAuthField } from "../../types/auth.ts";
import { UserContext } from "./util.ts";
import { ACCOUNT_TYPE } from "../registration/constant.ts";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<UserAuth | undefined>(
    getAuthUser(),
  );

  const updateUserAuthInfo = useCallback(
    (arg: UserAuthField) => {
      const payload = {
        ...currentUser,
        ...arg,
      };
      setUserAuth(payload);

      setCurrentUser(payload);
    },
    [currentUser],
  );

  const isSender = currentUser?.role === ACCOUNT_TYPE.Sender;
  return (
    <UserContext.Provider value={{ currentUser, isSender, updateUserAuthInfo }}>
      {children}
    </UserContext.Provider>
  );
};
