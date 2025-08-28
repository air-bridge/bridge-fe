import { Typography, Box, Avatar } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Order } from "../../types/order.ts";

type Props = {
  order: Order;
};

export const OrderTimeline = ({ order }: Props) => {
  return (
    <Box position="relative">
      <Box
        sx={{
          position: "absolute",
          left: 8,
          top: 12,
          bottom: 8,
          borderLeft: "dashed 1px",
          borderLeftColor: "grey.400",
        }}
      />

      {/* Origin */}
      <Box display="flex" alignItems="flex-start" mb={3}>
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
            variant="h6"
            textTransform="capitalize"
            sx={{ lineHeight: "1rem" }}
          >{`${order.pickup_state}`}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            textTransform="capitalize"
          >
            {order.pickup_country}
          </Typography>
        </Box>
      </Box>

      {/* Destination */}
      <Box display="flex" alignItems="center">
        <Avatar sx={{ width: 17, height: 20, bgcolor: "white", mt: 4 }}>
          <LocationOnIcon fontSize="small" sx={{ color: "black" }} />
        </Avatar>
        <Box ml={2} mt={2}>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            textTransform="capitalize"
          >
            {order.destination_country}
          </Typography>
          <Typography
            fontWeight="bold"
            textTransform="capitalize"
            sx={{ lineHeight: "1rem" }}
          >
            {order.destination_state}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
