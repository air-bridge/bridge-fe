import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Service } from "../../types/service.ts";

type Props = {
  data: Service;
};
export const ServiceDetails = ({ data }: Props) => {
  return (
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

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Available weight
            </Typography>
            <Typography>{`${data.weight}KG`}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h4"
            sx={{ pt: 2, borderTop: "solid 1px", borderTopColor: "grey.300" }}
          >
            Destination
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Departure
            </Typography>
            <Typography>{`${data.departure_city}, ${data.departure_country}`}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              To (Destination address)
            </Typography>
            <Typography>{`${data.arrival_city}, ${data.arrival_country}`}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" sx={{ pt: 1.5 }}>
            Destination
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Phone Number
            </Typography>
            <Typography>{data.phone}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Additional note
            </Typography>
            <Typography>additional note</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
