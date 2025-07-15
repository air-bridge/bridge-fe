import { getAPI, putAPI } from "./api.ts";
import {
  NotificationsFormValues,
  Profile,
  ProfileFormValues,
} from "../types/user.ts";

export const updateUser = async (id: number, payload: ProfileFormValues) => {
  const res = await putAPI(`users/${id}`, payload);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Profile update failed, please try again!",
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
      errorData.message || "Notifications settings failed, please try again!",
    );
  }

  return (await res.json()) as { isSuccess: boolean };
};

export const getProfile = async () => {
  const res = await getAPI(`users/profile`);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Fail to fetch profile, please try again!",
    );
  }

  const response: {
    data: Profile;
  } = await res.json();

  return response.data;
};
