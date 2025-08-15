import { PropsWithChildren, useState } from "react";
import { initialPayload, ServiceSearchContext } from "./util.ts";
import { ServiceInput } from "../../types/service.ts";

export const ServiceSearchContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [payload, setPayload] = useState(initialPayload);

  const handlePayload = (arg: ServiceInput) => {
    setPayload({
      ...payload,
      ...arg,
    });
  };

  return (
    <ServiceSearchContext.Provider
      value={{ payload, setPayload: handlePayload }}
    >
      {children}
    </ServiceSearchContext.Provider>
  );
};
