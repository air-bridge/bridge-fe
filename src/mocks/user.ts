import { ACCOUNT_TYPE } from "../context/registration/constant.ts";

export const mockUserAuth = {
  refresh_token: "refresh_token",
  token: "dummy_token",
  firstname: "Alex",
  lastname: "Max",
  email: "test@mail.com",
  role: ACCOUNT_TYPE.Sender,
};
