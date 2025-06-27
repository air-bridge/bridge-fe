import { Order, OrderStatus } from "../types/order.ts";

export const orders: Order[] = [
  {
    id: "1",
    title: "I need urgent delivery",
    createdAt: "17 March 2025, 9:05pm",
    weight: "30KG",
    status: OrderStatus.Draft,
    origin: "Lagos",
    category: [],
  },
  {
    id: "2",
    title: "My Passport",
    createdAt: "17 June 2025, 10:30pm",
    weight: "10KG",
    status: OrderStatus.Open,
    origin: "Berlin",
    destination: "Lagos",
    tripType: "1 way trip",
    category: ["Documents", "Box", "Luggage"],
  },
  {
    id: "3",
    title: "Photo booth delivery",
    createdAt: "21 August 2024, 08:30am",
    weight: "10KG",
    status: OrderStatus.Pending,
    origin: "Texas",
    destination: "Paris",
    tripType: "1 way trip",
    category: ["Documents", "Box", "Luggage"],
  },
];

export const mockDraftOrder: Order = {
  id: "1",
  title: "I need urgent delivery",
  createdAt: "17 March 2025, 9:05pm",
  weight: "30KG",
  status: OrderStatus.Draft,
  origin: "Lagos",
  category: [],
};

export const mockOpenOrder: Order = {
  id: "2",
  title: "My Passport",
  createdAt: "17 June 2025, 10:30pm",
  weight: "10KG",
  status: OrderStatus.Open,
  origin: "Berlin",
  destination: "Lagos",
  tripType: "1 way trip",
  category: ["Documents", "Box", "Luggage"],
};

export const mockPendingOrder: Order = {
  id: "3",
  title: "Photo booth delivery",
  createdAt: "21 August 2024, 08:30am",
  weight: "10KG",
  status: OrderStatus.Pending,
  origin: "Texas",
  destination: "Paris",
  tripType: "1 way trip",
  category: ["Documents", "Box", "Luggage"],
};
