import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { ServiceStatusLabel } from "./ServiceStatusLabel.tsx";
import { ServiceTimeline } from "./ServiceTimeline.tsx";
import dayjs from "dayjs";
import { Service } from "../../types/service.ts";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

type Props = {
  data: Service;
};

const ServiceCard = ({ data }: Props) => {
  return (
    <Card>
      <CardContent component={Stack} gap={1.5}>
        <Stack gap={0.5}>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ "&:first-letter": { textTransform: "uppercase" } }}
          >
            {data.title}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="caption">
              Created on {dayjs(data.created_at).format("MMMM D, YYYY h:mm A")}
            </Typography>
            <ServiceStatusLabel status={data.status} />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            textTransform="capitalize"
          >
            Transport Type:&nbsp;
            {data.transport_type || "-"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Available Weight:&nbsp;
            <strong style={{ color: "black" }}>{data.weight}KG</strong>
          </Typography>
        </Stack>

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            px: 1.5,
            py: 0.75,
            borderRadius: 5,
            bgcolor: "primary.light",
            width: "fit-content",
          }}
        >
          <Typography variant="h6">
            {`${data.price_per_kg} ${data.currency.toUpperCase()} per KG`}
          </Typography>
          <LocalAtmIcon />
        </Stack>

        <ServiceTimeline data={data} />
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
