import { RegistrationPayload } from "./user.ts";

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
  transport_type: string | null;
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
  delivery_note: string;
  created_at: string;
  updated_at: string;
}

export type ServiceFormValues = {
  title: string;
  weight?: number;
  arrival_city: string;
  arrival_country: string;
  arrival_date: string;
  currency: string;
  departure_city: string;
  departure_country: string;
  departure_date: string;
  phone: string;
  price_per_kg?: number;
  status?: ServiceStatus | null;
  transport_type?: string | null;
  delivery_note?: string | null;
};

export type ServiceSearchPayload = {
  status: string;
  query: string;
};

export type ServiceInput = Partial<Record<keyof ServiceSearchPayload, string>>;
