import { putAPI } from "./api.ts";
import {
  NotificationsFormValues,
  ProfileFormValues,
  SetNewPasswordValues,
} from "../types/user.ts";

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

export const setNewPassword = async (payload: SetNewPasswordValues) => {
  const res = await putAPI(`users/change-password`, payload);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Password update failed, please try again!",
    );
  }

  return (await res.json()) as { isSuccess: boolean };
};

export const setNotifications = async (payload: NotificationsFormValues) => {
  const res = await putAPI(`users/set-notifications`, payload);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "notifications settings failed, please try again!",
    );
  }

  return (await res.json()) as { isSuccess: boolean };
};
