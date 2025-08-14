import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { ServiceStatusLabel } from "./ServiceStatusLabel.tsx";
import { ServiceTimeline } from "./ServiceTimeline.tsx";
import dayjs from "dayjs";
import { Service } from "../../types/service.ts";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { transportTypes } from "../service-form/util.ts";
import { ButtonChip } from "../button-chip";

type Props = {
  data: Service;
  onOpen: (arg: Service) => void;
};

const ServiceCard = ({ data, onOpen }: Props) => {
  const transportType = transportTypes.find(
    (transport) => transport.value === data.transport_type,
  );

  return (
    <Card onClick={() => onOpen(data)} sx={{ cursor: "pointer" }}>
      <CardContent>
        <Stack gap={2}>
          <Stack gap={1}>
            <Typography variant="subtitle1" noWrap>
              {data.title}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography variant="caption">
                Created on{" "}
                {dayjs(data.created_at).format("MMMM D, YYYY h:mm A")}
              </Typography>
              {data.status && <ServiceStatusLabel status={data.status} />}
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Transport Type:&nbsp;
              <strong style={{ color: "black" }}>{data.transport_type}</strong>
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
              px: 2,
              py: 1,
              borderRadius: 5,
              bgcolor: "info.light",
              width: "fit-content",
            }}
          >
            <Typography variant="subtitle2">
              {`${data.price_per_kg} ${data.currency} per KG`}
            </Typography>
            <LocalAtmIcon />
          </Stack>

          <ServiceTimeline data={data} />

          {transportType && (
            <Stack gap={0.5}>
              <Typography color="text.secondary" variant="body2">
                Trip Type
              </Typography>

              <ButtonChip
                label={transportType.name}
                Icon={transportType.icon}
              />
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
