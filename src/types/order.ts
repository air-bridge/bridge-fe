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
  package_type: string;
  weight: number | null;
  destination_address: string;
  destination_state: string;
  destination_country: string;
  pickup_address: string;
  pickup_state: string;
  pickup_country: string;
  receiver_firstname: string;
  receiver_lastname: string;
  receiver_phone: string;
  delivery_note?: string | null;
  image1?: File | string | null;
  image2?: File | string | null;
  image3?: File | string | null;
};
