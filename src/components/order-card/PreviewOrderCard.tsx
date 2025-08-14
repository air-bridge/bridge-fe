import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Order } from "../../types/order.ts";
import { OrderStatusLabel } from "./OrderStatusLabel.tsx";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type Props = {
  order: Order;
};

export const PreviewOrderCard = ({ order }: Props) => {
  return (
    <Card>
      <CardContent gap={1} component={Stack}>
        <Stack>
          <Typography
            variant="subtitle2"
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
            <Typography variant="caption" color="text.secondary">
              Package Weight:&nbsp;
              <strong style={{ color: "black" }}>{order.weight}KG</strong>
            </Typography>

            <OrderStatusLabel status={order.status} />
          </Stack>
          <Typography variant="caption" color="text.secondary" noWrap>
            Customer Name
          </Typography>
        </Stack>

        <Divider />
        <Box>
          <Box position="relative">
            <Box
              sx={{
                position: "absolute",
                left: 8,
                top: 12,
                bottom: 0,
                borderLeft: "dashed 1px",
                borderLeftColor: "grey.400",
              }}
            />

            {/* Origin */}
            <Box display="flex" alignItems="flex-start" mb={1}>
              <Avatar
                sx={{
                  width: 15,
                  height: 15,
                  bgcolor: "white",
                  color: "grey.900",
                  mt: 0.2,
                }}
              >
                <RadioButtonUncheckedIcon fontSize="small" />
              </Avatar>
              <Box ml={2}>
                <Typography
                  variant="subtitle2"
                  textTransform="capitalize"
                >{`${order.pickup_state}, ${order.pickup_country}`}</Typography>
              </Box>
            </Box>

            {/* Destination */}
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 17, height: 20, bgcolor: "white", mt: 3 }}>
                <LocationOnIcon fontSize="small" sx={{ color: "black" }} />
              </Avatar>
              <Box ml={2} mt={2.5}>
                <Typography
                  variant="subtitle2"
                  textTransform="capitalize"
                >{`${order.destination_state}, ${order.destination_country}`}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Stack alignItems="center" gap={1} direction="row" minHeight={20}>
          {order.package_type.length > 0 && (
            <>
              <Typography color="text.secondary" variant="caption">
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
