export enum OrderStatus {
  Draft = "draft",
  Inactive = "inactive",
  Open = "open",
  Pending = "pending",
  Active = "active",
}
export interface Order {
  id: number;
  user_id: number;
  title: string;
  description: string;
  weight: number;
  package_type: string[];
  payment_status: boolean;
  status: OrderStatus;
  destination_address: string;
  destination_state: string;
  destination_country: string;
  pickup_address: string;
  pickup_state: string;
  pickup_country: string;
  receiver_firstname: string;
  receiver_lastname: string;
  receiver_phone: string;
  delivery_note: string;
  image1: string;
  image2: string;
  image3: string;
  created_at: string;
  updated_at: string;
}

export type OrderFormValues = {
  title: string;
  package_type: string[];
  weight?: number | null;
  delivery_date: string;
  destination_address: string;
  destination_state: string;
  destination_country: string;
  pickup_address: string;
  pickup_state: string;
  pickup_country: string;
  receiver_firstname?: string | null;
  receiver_lastname?: string | null;
  receiver_phone: string;
  delivery_note?: string | null;
  image1?: File | string | null;
  image2?: File | string | null;
  image3?: File | string | null;
  terms: boolean;
};
