import { Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormContext } from "react-hook-form";
import { ServiceFormValues } from "../../types/service.ts";
import dayjs from "dayjs";
import { serviceStatusColor, transportTypes } from "./util.ts";
import { ButtonChip } from "../button-chip";

export const ServiceDetails = () => {
  const { watch } = useFormContext<ServiceFormValues>();

  const title = watch("title");
  const weight = watch("weight");
  const pricePerKg = watch("price_per_kg");
  const departureDate = watch("departure_date");
  const departureCity = watch("departure_city");
  const departureCountry = watch("departure_country");
  const arrivalDate = watch("arrival_date");
  const arrivalCity = watch("arrival_city");
  const arrivalCountry = watch("arrival_country");
  const phone = watch("phone");
  const deliveryNote = watch("delivery_note");
  const status = watch("status");
  const transport_type = watch("transport_type");
  const currency = watch("currency");

  const transportType = transportTypes.find(
    (transport) => transport.value === transport_type,
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
              <Typography color="text.primary">{title}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Available weight
              </Typography>
              <Typography>{`${weight}KG`}</Typography>
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
              >{`${pricePerKg} ${currency}`}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Departure Date
              </Typography>
              <Typography>{dayjs(departureDate).format("ll")}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Arrival Date
              </Typography>
              <Typography>{dayjs(arrivalDate).format("ll")}</Typography>
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
                  color: serviceStatusColor[status],
                }}
              >
                {status}
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
              <Typography>{`${departureCity}, ${departureCountry}`}</Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                To
              </Typography>
              <Typography>{`${arrivalCity}, ${arrivalCountry}`}</Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Stack>
              <Typography color="text.secondary" variant="body2">
                Phone
              </Typography>
              <Typography>{phone}</Typography>
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

          {deliveryNote && (
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

                <Typography variant="body2">{deliveryNote}</Typography>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};
