import { ACCOUNT_TYPE } from "../context/registration/constant.ts";
import { Profile } from "../types/user.ts";

export const mockUserAuth = {
  refresh_token: "refresh_token",
  token: "dummy_token",
  firstname: "Alex",
  lastname: "Max",
  email: "test@mail.com",
  role: ACCOUNT_TYPE.Sender,
  current_role: ACCOUNT_TYPE.Sender,
};

export const mockUserProfile: Profile = {
  id: 2,
  firstname: "Alex",
  lastname: "Max",
  email: "test@mail.com",
  role: ACCOUNT_TYPE.Sender,
  current_role: ACCOUNT_TYPE.Sender,
  image: "",
  phone: "098298398938",
  country_code: "Nigeria",
  state: "Lagos",
};
