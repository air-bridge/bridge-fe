import OrderCard from "../order-card";
import { Grid2 } from "@mui/material";
import { Order } from "../../types/order.ts";
import { Link } from "react-router-dom";

type Props = {
  orders: Order[];
};
export const OrderList = ({ orders }: Props) => {
  return (
    <Grid2 container spacing={2}>
      {orders.map((order) => (
        <Grid2 key={order.id} size={{ xs: 12, lg: 4 }}>
          <Link to={`orders/${order.id}`}>
            <OrderCard order={order} />
          </Link>
        </Grid2>
      ))}
    </Grid2>
  );
};
