import { postFormDataAPI } from "./api.ts";
import { Order, OrderFormValues } from "../types/order.ts";

export const createOrder = async (payload: OrderFormValues) => {
  const res = await postFormDataAPI("senders/orders", payload);

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
