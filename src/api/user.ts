import { putAPI } from "./api.ts";
import { ProfileFormValues } from "../types/user.ts";

export const updateUser = async (id: string, payload: ProfileFormValues) => {
  const res = await putAPI(`users/${id}`, payload);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Profile update failed, please try again!",
    );
  }

  // TODO: Update user cookie details
  return (await res.json()) as { isSuccess: boolean };
};
