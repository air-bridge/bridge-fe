import { orders } from "../../mocks/order.ts";
import OrderCard from "../order-card";
import { Grid2 } from "@mui/material";

export const OrderList = () => {
  //  TODO: EQUAL HEIGHT
  return (
    <Grid2 container spacing={2}>
      {orders.map((order) => (
        <Grid2 key={order.id} size={{ xs: 6, lg: 4 }}>
          <OrderCard order={order} />
        </Grid2>
      ))}
    </Grid2>
  );
};
