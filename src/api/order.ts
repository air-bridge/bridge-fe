import { getAPI, postFormDataAPI, putAPI } from "./api.ts";
import { Order, OrderFormValues } from "../types/order.ts";
import { MatchService } from "../types/service.ts";
import { trimPayload } from "../utils/form.ts";

export const createOrder = async (payload: OrderFormValues) => {
  const refinedPayload = trimPayload(payload);
  const res = await postFormDataAPI("senders/orders", refinedPayload);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
      error: string;
    };

    throw new Error(
      errorData.message || "Unable to create order. Please try again!",
    );
  }

  const response = (await res.json()) as { data: Order };

  return response.data;
};

export const updateOrder = async (
  orderId: string,
  payload: OrderFormValues,
) => {
  // TODO: allow package type update when BE is fixed
  const refinedPayload: Record<
    string,
    string | number | boolean | string[] | File | null
  > = {};
  for (const [key, value] of Object.entries(payload)) {
    if (["image1", "image2", "image3"].includes(key)) {
      refinedPayload[key] = value;
    } else if (value) {
      refinedPayload[key] = value;
    }
  }

  const res = await putAPI(`senders/orders/${orderId}`, {
    ...refinedPayload,
    package_type: undefined,
  });

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
      error: string;
    };

    throw new Error(
      errorData.message || "Unable to create order. Please try again!",
    );
  }

  const response = (await res.json()) as { data: Order };

  return response.data;
};

export const getOrder = async (id: string) => {
  const res = await getAPI(`senders/orders/${id}`);

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
      error: string;
    };

    throw new Error(
      errorData.error ||
        errorData.message ||
        "Fail to fetch order data, please try again!",
    );
  }

  const response: {
    data: Order;
  } = await res.json();

  return response.data;
};

export const findMatching = async (
  id: string,
  startDate: string,
  endDate: string,
) => {
  const res = await getAPI(
    `senders/orders/${id}/matching?start_date=${startDate}&end_date=${endDate}`,
  );

  if (!res.ok) {
    const errorData = (await res.json()) as {
      message: string;
      error: string;
    };

    throw new Error(
      errorData.error ||
        errorData.message ||
        "Fail to match order, please try again!",
    );
  }

  const response: {
    data: {
      total_matches: number;
      services: MatchService[];
    };
  } = await res.json();

  return response.data;
};
