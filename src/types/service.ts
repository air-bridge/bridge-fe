export enum ServiceStatus {
  Draft = "Draft",
  Open = "Open",
  Pending = "Pending",
  Requested = "Requested",
}
export interface Service {
  id: string;
  title: string;
  createdAt: string;
  weight: string;
  status: ServiceStatus;
  origin: string;
  destination?: string;
  tripType?: string;
  category: string[];
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
