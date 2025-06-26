import { Typography, Box, Avatar } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Order } from "../../types/order.ts";

type Props = {
  order: Order;
};

export const OrderTimeline = ({ order }: Props) => {
  return (
    <Box mt={3} position="relative" pl={3}>
      {/* Vertical Line */}
      <Box
        sx={{
          position: "absolute",
          left: 33,
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
            width: 20,
            height: 20,
            bgcolor: "white",
            color: "grey.400",
            mt: 0.5,
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
            {order.tripType}
          </Typography>
        </Box>
      </Box>

      {/* Destination */}
      <Box display="flex" alignItems="center">
        <Avatar sx={{ width: 20, height: 20, bgcolor: "white", mt: 3 }}>
          <LocationOnIcon fontSize="small" sx={{ color: "black" }} />
        </Avatar>
        <Box ml={2} mt={2.5}>
          <Typography fontWeight="bold">{order.destination}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
