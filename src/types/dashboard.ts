import { Order } from "./order.ts";
import { Service } from "./service.ts";

export type SenderStats = {
  total_requests: number;
  active_requests: number;
  completed_orders: number;
  recent_orders: Order[];
};

export type PassengerStats = {
  total_requests: number;
  active_requests: number;
  total_services: number;
  active_services: number;
  recent_requests: Service[];
};

export type DashboardStat = {
  name: string;
  count: number;
  background: string;
  color: string;
};
