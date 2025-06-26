import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { Order } from "../../types/order.ts";
import { OrderStatusLabel } from "./OrderStatusLabel.tsx";
import { OrderTimeline } from "./OrderTimeline.tsx";

type Props = {
  order: Order;
};
const OrderCard = ({ order }: Props) => {
  return (
    <Card>
      <CardContent>
        <Stack gap={1}>
          <Typography variant="subtitle1">{order.title}</Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="caption">{order.createdAt}</Typography>
            <OrderStatusLabel status={order.status} />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Package Weight:&nbsp;
            <strong style={{ color: "black" }}>{order.weight}</strong>
          </Typography>
        </Stack>

        <Box
          sx={{ borderTop: "solid 1px", borderTopColor: "grey.300" }}
          py={2}
          mt={2}
        >
          <OrderTimeline order={order} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
