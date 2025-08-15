import { Grid2, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Order } from "../../types/order.ts";
import { PhotoPreview } from "../photo-input/PhotoPreview.tsx";
import { luggageCategories, LuggageCategory } from "../order-form/util.ts";
import { ButtonChip } from "../button-chip";

type Props = {
  data: Order;
};
export const OrderDetails = ({ data }: Props) => {
  const packageTypes: LuggageCategory[] = [];
  data.package_type.forEach((pv) => {
    const cat = luggageCategories.find((l) => l.value === pv);
    if (cat) {
      packageTypes.push(cat);
    }
  });

  const noImage = !data.image1 && !data.image2 && !data.image3;
  const receiver =
    !data?.receiver_firstname && !data?.receiver_lastname
      ? "-"
      : `${data?.receiver_firstname} ${data?.receiver_lastname}`;

  return (
    <Stack gap={{ xs: 2, lg: 3 }}>
      <Stack gap={0.75} alignItems="flex-start">
        <Typography color="text.secondary" variant="body2">
          Package Type
        </Typography>
        <Stack direction="row" gap={1}>
          {packageTypes.map((pv) => (
            <ButtonChip selected label={pv.name} Icon={pv.icon} />
          ))}
        </Stack>
      </Stack>

      <Grid container spacing={{ xs: 1, lg: 2 }}>
        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Order Title
            </Typography>
            <Typography color="text.primary">{data.title}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Package weight
            </Typography>
            <Typography fontWeight={500}>{`${data.weight}KG`}</Typography>
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

        <Grid size={{ xs: 6 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              From
            </Typography>
            <Typography textTransform="capitalize">
              {`${data.pickup_state}, ${data.pickup_country}`}
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Pickup Address
            </Typography>
            <Typography>{`${data.pickup_address}, ${data.pickup_state}`}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              To
            </Typography>
            <Typography textTransform="capitalize">
              {`${data.destination_state}, ${data.destination_country}`}
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Destination address
            </Typography>
            <Typography>{`${data.destination_address}, ${data.destination_state}, ${data.destination_country}`}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" sx={{ pt: 1.5 }}>
            Receiver
          </Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Full Name
            </Typography>
            <Typography>{receiver}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Phone Number
            </Typography>
            <Typography>{data.receiver_phone || "-"}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Delivery Address
            </Typography>
            <Typography>{`${data.destination_address}, ${data.destination_state}, ${data.destination_country}`}</Typography>
          </Stack>
        </Grid>
      </Grid>

      {!noImage && (
        <Typography color="text.secondary" fontWeight="300">
          Uploaded Image
        </Typography>
      )}

      <Grid2 container spacing={1}>
        {data.image1 && (
          <Grid2 size={{ xs: 12, lg: 4 }}>
            <PhotoPreview file={data.image1} />
          </Grid2>
        )}

        {data.image2 && (
          <Grid2 size={{ xs: 12, lg: 4 }}>
            <PhotoPreview file={data.image2} />
          </Grid2>
        )}

        {data.image3 && (
          <Grid2 size={{ xs: 12, lg: 4 }}>
            <PhotoPreview file={data.image3} />
          </Grid2>
        )}
      </Grid2>

      {data.delivery_note && (
        <Stack gap={0.5}>
          <Typography variant="body2" color="text.secondary">
            Delivery Note
          </Typography>
          <Typography>{data.delivery_note}</Typography>
        </Stack>
      )}
    </Stack>
  );
};
