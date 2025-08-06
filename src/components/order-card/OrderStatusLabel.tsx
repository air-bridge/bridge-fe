import { OrderStatus } from "../../types/order.ts";
import { Chip, ChipProps } from "@mui/material";

type Props = {
  status: OrderStatus;
};

const chipColor: Record<OrderStatus, ChipProps["color"]> = {
  [OrderStatus.Inactive]: "secondary",
  [OrderStatus.Draft]: "secondary",
  [OrderStatus.Open]: "success",
  [OrderStatus.Pending]: "warning",
  [OrderStatus.Requested]: "warning",
};

export const OrderStatusLabel = ({ status }: Props) => {
  return <Chip label={status} size="small" color={chipColor[status]} />;
};
