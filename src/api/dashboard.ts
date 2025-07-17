import { getAPI } from "./api.ts";

export const passengerDashboard = async () => {
  const res = await getAPI(`passenger/dashboard`);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Fail to fetch dashboard data, please try again!",
    );
  }

  const response: {
    data: string[];
  } = await res.json();

  return response.data;
};

export const senderDashboard = async () => {
  const res = await getAPI(`sender/dashboard`);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
    };

    throw new Error(
      errorData.message || "Fail to fetch dashboard data, please try again!",
    );
  }

  const response: {
    data: string[];
  } = await res.json();

  return response.data;
};
