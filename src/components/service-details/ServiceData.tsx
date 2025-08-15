import { Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Service } from "../../types/service.ts";
import dayjs from "dayjs";
import { serviceStatusColor, transportTypes } from "../service-form/util.ts";
import { ButtonChip } from "../button-chip";

type Props = {
  data: Service;
};

export const ServiceData = ({ data }: Props) => {
  const transportType = transportTypes.find(
    (transport) => transport.value === data.transport_type,
  );
  return (
    <Stack gap={{ xs: 2, lg: 2 }}>
      <Stack gap={{ xs: 2, lg: 3 }}>
        <Grid container spacing={{ xs: 1, lg: 2 }}>
          <Grid size={{ xs: 12 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Service Title
              </Typography>
              <Typography color="text.primary">{data.title}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Available weight
              </Typography>
              <Typography>{`${data.weight}KG`}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Price Per KG
              </Typography>
              <Typography
                textTransform="uppercase"
                sx={{ fontWeight: 600 }}
              >{`${data.price_per_kg} ${data.currency}`}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Departure Date
              </Typography>
              <Typography>{dayjs(data.departure_date).format("ll")}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Arrival Date
              </Typography>
              <Typography>{dayjs(data.arrival_date).format("ll")}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Created Date
              </Typography>
              <Typography>{dayjs(data.created_at).format("ll")}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Status
              </Typography>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: serviceStatusColor[data.status],
                }}
              >
                {data.status}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider />

        <Typography variant="h4">Destination</Typography>

        <Grid container spacing={{ xs: 1, lg: 2 }}>
          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                From
              </Typography>
              <Typography>
                {`${data.departure_city}, ${data.departure_country}`}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                To
              </Typography>
              <Typography>
                {`${data.arrival_city}, ${data.arrival_country}`}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Phone
              </Typography>
              <Typography>{data.phone}</Typography>
            </Stack>
          </Grid>

          {transportType && (
            <Grid size={{ xs: 6 }}>
              <Stack gap={0.5}>
                <Typography color="text.secondary" variant="body2">
                  Trip Type
                </Typography>

                <ButtonChip
                  label={transportType.name}
                  Icon={transportType.icon}
                />
              </Stack>
            </Grid>
          )}

          {data.delivery_note && (
            <Grid size={{ xs: 12 }}>
              <Stack
                gap={0.5}
                py={2}
                mt={2}
                sx={{
                  borderTop: "solid 1px",
                  borderBottom: "solid 1px",
                  borderTopColor: "divider",
                  borderBottomColor: "divider",
                }}
              >
                <Typography color="text.secondary" variant="body2">
                  Additional Note
                </Typography>

                <Typography variant="body2">{data.delivery_note}</Typography>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};
