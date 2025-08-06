import { parsePhoneNumber } from "awesome-phonenumber";

export const isValidPhoneNumber = (
  value: string,
  regionCode?: string | null,
) => {
  try {
    return regionCode
      ? parsePhoneNumber(value, { regionCode }).valid
      : parsePhoneNumber(value).valid;
  } catch (err) {
    return false;
  }
};

export const formatPhone = (value: string, regionCode?: string | null) => {
  return regionCode
    ? parsePhoneNumber(value, { regionCode })
    : parsePhoneNumber(value);
};
