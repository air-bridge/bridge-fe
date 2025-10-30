import { createContext, useContext } from "react";
import { OrderInput, OrderSearchPayload } from "../../types/order.ts";

type Props = {
  payload: OrderSearchPayload;
  setPayload: (arg: OrderInput) => void;
};

export const initialPayload = {
  status: "",
  query: "",
  offset: "0",
  limit: "9",
  page: "1",
};

export const OrderSearchContext = createContext<Props>({
  payload: initialPayload,
  setPayload: () => {},
});

export const useOrderSearchContext = () => useContext(OrderSearchContext);
