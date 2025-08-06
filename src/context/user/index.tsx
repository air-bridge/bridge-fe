import { PropsWithChildren } from "react";
import { UserContext } from "./util.ts";
import { ACCOUNT_TYPE } from "../registration/constant.ts";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/user.ts";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const {
    data: profileData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfile,
  });

  const refetchProfile = () => {
    void refetch();
  };

  const isSender = isLoading
    ? null
    : profileData?.current_role === ACCOUNT_TYPE.Sender;
  const isPassenger = isLoading
    ? null
    : profileData?.current_role === ACCOUNT_TYPE.Passenger;
  return (
    <UserContext.Provider
      value={{
        currentUser: profileData,
        isSender,
        isPassenger,
        refetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
