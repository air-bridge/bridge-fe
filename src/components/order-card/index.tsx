import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { Order } from "../../types/order.ts";
import { OrderStatusLabel } from "./OrderStatusLabel.tsx";
import { OrderTimeline } from "./OrderTimeline.tsx";
import dayjs from "dayjs";

type Props = {
  order: Order;
};
const OrderCard = ({ order }: Props) => {
  return (
    <Card>
      <CardContent component={Stack} gap={1}>
        <Stack>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ "&:first-letter": { textTransform: "uppercase" } }}
          >
            {order.title}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="caption">
              Created on {dayjs(order.created_at).format("MMMM D, YYYY h:mm A")}
            </Typography>
            <OrderStatusLabel status={order.status} />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Package Weight:&nbsp;
            <strong style={{ color: "black" }}>{order.weight}KG</strong>
          </Typography>
        </Stack>

        <Divider />

        <OrderTimeline order={order} />

        <Stack alignItems="center" gap={1} direction="row" minHeight={20}>
          {order.package_type.length > 0 && (
            <>
              <Typography color="text.secondary" variant="body2">
                Package type:
              </Typography>

              <Stack direction="row" alignItems="center" gap={0.5}>
                {order.package_type.map((c, index) => (
                  <Typography
                    variant="caption"
                    key={index}
                    sx={{
                      borderRadius: 1.5,
                      px: 0.5,
                      py: 0.25,
                      bgcolor: "success.light",
                      textTransform: "capitalize",
                    }}
                  >
                    {c}
                  </Typography>
                ))}
              </Stack>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
