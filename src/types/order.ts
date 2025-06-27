export enum OrderStatus {
  Draft = "Draft",
  Open = "Open",
  Pending = "Pending",
  Requested = "Requested",
}
export interface Order {
  id: string;
  title: string;
  createdAt: string;
  weight: string;
  status: OrderStatus;
  origin: string;
  destination?: string;
  tripType?: string;
  category: string[];
}

export type OrderFormValues = {
  title: string;
  luggageType: string;
  weight: number;
  destination?: string;
  origin?: string;
  receiver?: string;
  address?: string;
};
