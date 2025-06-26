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
          bottom: 0,
          borderLeft: "dashed 1px",
          borderLeftColor: "grey.400",
        }}
      />

      {/* Origin */}
      <Box display="flex" alignItems="flex-start" mb={2}>
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
          <Typography variant="h6">{order.origin}</Typography>
          <Typography variant="body2" color="text.secondary">
            {order.createdAt}
          </Typography>
          <Typography variant="subtitle2" color="success.main" mt={3}>
            {order.tripType}&nbsp;
          </Typography>
        </Box>
      </Box>

      {/* Destination */}
      <Box display="flex" alignItems="center">
        <Avatar sx={{ width: 17, height: 20, bgcolor: "white", mt: 3 }}>
          <LocationOnIcon fontSize="small" sx={{ color: "black" }} />
        </Avatar>
        <Box ml={2} mt={2.5}>
          <Typography fontWeight="bold">{order.destination}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
