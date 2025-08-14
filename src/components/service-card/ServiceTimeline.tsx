import { Typography, Box, Avatar } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Service } from "../../types/service.ts";
import dayjs from "dayjs";

type Props = {
  data: Service;
};

export const ServiceTimeline = ({ data }: Props) => {
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
          <Typography variant="subtitle2">{`${data.departure_city}`}</Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {`Trip Date -  ${dayjs(data.departure_date).format("ll")}`}
          </Typography>
          <Typography
            variant="caption"
            color="success.main"
            mt={3}
            noWrap
            component="p"
          >
            {/*  TODO: data point needed */}1 way trip
          </Typography>
        </Box>
      </Box>

      {/* Destination */}
      <Box display="flex" alignItems="center">
        <Avatar sx={{ width: 17, height: 20, bgcolor: "white", mt: 3 }}>
          <LocationOnIcon fontSize="small" sx={{ color: "black" }} />
        </Avatar>
        <Box ml={2} mt={0.75}>
          <Typography variant="caption" color="text.secondary" noWrap>
            {`Arrival Date - ${dayjs(data.departure_date).format("ll")}`}
          </Typography>
          <Typography variant="subtitle2" textTransform="capitalize">
            {data.arrival_city}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
