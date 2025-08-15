import { PropsWithChildren, useState } from "react";
import { initialPayload, OrderSearchContext } from "./util.ts";
import { OrderInput } from "../../types/order.ts";

export const OrderSearchContextProvider = ({ children }: PropsWithChildren) => {
  const [payload, setPayload] = useState(initialPayload);

  const handlePayload = (arg: OrderInput) => {
    setPayload({
      ...payload,
      ...arg,
    });
  };

  return (
    <OrderSearchContext.Provider value={{ payload, setPayload: handlePayload }}>
      {children}
    </OrderSearchContext.Provider>
  );
};
