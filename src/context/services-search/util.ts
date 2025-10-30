import { createContext, useContext } from "react";
import { ServiceInput, ServiceSearchPayload } from "../../types/service.ts";

type Props = {
  payload: ServiceSearchPayload;
  setPayload: (arg: ServiceInput) => void;
};

export const initialPayload = {
  status: "",
  query: "",
  offset: "0",
  limit: "9",
  page: "1",
};

export const ServiceSearchContext = createContext<Props>({
  payload: initialPayload,
  setPayload: () => {},
});

export const useServiceSearchContext = () => useContext(ServiceSearchContext);
