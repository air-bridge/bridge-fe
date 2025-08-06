import { getAPI } from "./api.ts";
import { PassengerStats, SenderStats } from "../types/dashboard.ts";

export const getPassengerDashboard = async () => {
  const res = await getAPI(`passengers/dashboard`);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Fail to fetch dashboard data, please try again!",
    );
  }

  const response: {
    data: PassengerStats;
  } = await res.json();

  return response.data;
};

export const getSenderDashboard = async () => {
  const res = await getAPI(`senders/dashboard`);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Fail to fetch dashboard data, please try again!",
    );
  }

  const response: {
    data: SenderStats;
  } = await res.json();

  return response.data;
};
