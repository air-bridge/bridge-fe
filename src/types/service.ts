export enum ServiceStatus {
  Draft = "draft",
  Open = "open",
  Active = "active",
  Stale = "stale",
  Matched = "matched",
  Completed = "completed",
}
export interface Service {
  id: number;
  title: string;
  transport_type: string;
  package_type: string[];
  status: ServiceStatus;
  weight: string;
  arrival_city: string;
  arrival_country: string;
  arrival_date: string;
  currency: string;
  departure_city: string;
  departure_country: string;
  departure_date: string;
  phone: string;
  price_per_kg: string;
  created_at: string;
  updated_at: string;
}

export type ServiceFormValues = {
  title: string;
  luggageType: string;
  weight?: number | null;
  destination?: string | null;
  origin?: string | null;
  receiver?: string | null;
  address?: string | null;
};
