import {
  Button,
  CircularProgress,
  Grid2,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../../types/order.ts";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PhotoPreview } from "../photo-input/PhotoPreview.tsx";
import { luggageCategories, LuggageCategory } from "./util.ts";
import { ButtonChip } from "../button-chip";

type Props = {
  isPending: boolean;
  onBack: () => void;
};

export const OrderDetails = ({ isPending, onBack }: Props) => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const { watch } = useFormContext<OrderFormValues>();

  const packageTypeValue = watch("package_type") || [];
  const packageTypes: LuggageCategory[] = [];
  packageTypeValue.forEach((pv) => {
    const cat = luggageCategories.find((l) => l.value === pv);
    if (cat) {
      packageTypes.push(cat);
    }
  });

  const title = watch("title");
  const weight = watch("weight");
  const pickupAddress = watch("pickup_address");
  const destinationAddress = watch("destination_address");
  const destinationCountry = watch("destination_country");
  const destinationState = watch("destination_state");
  const pickupCountry = watch("pickup_country");
  const pickupState = watch("pickup_state");
  const receiverFirstName = watch("receiver_firstname");
  const receiverLastName = watch("receiver_lastname");
  const receiverPhone = watch("receiver_phone");
  const deliveryNote = watch("delivery_note");
  const image1 = watch("image1");
  const image2 = watch("image2");
  const image3 = watch("image3");

  const noImage = !image1 && !image2 && !image3;
  const receiverName =
    !receiverFirstName && !receiverLastName
      ? ""
      : `${receiverFirstName} ${receiverLastName}`;

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
            <Typography color="text.primary">{title}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Package weight
            </Typography>
            <Typography>{weight ? `${weight}KG` : "-"}</Typography>
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
              From (Pickup address)
            </Typography>
            <Typography>{`${pickupAddress}, ${pickupState}, ${pickupCountry}`}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              To (Destination address)
            </Typography>
            <Typography>{`${destinationAddress}, ${destinationState}, ${destinationCountry}`}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" sx={{ pt: 1.5 }}>
            Receiver
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Full Name
            </Typography>
            <Typography>{receiverName || "-"}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Phone Number
            </Typography>
            <Typography>{receiverPhone || "-"}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack>
            <Typography color="text.secondary" variant="body2">
              Delivery Address
            </Typography>
            <Typography>{`${destinationAddress}, ${destinationState}, ${destinationCountry}`}</Typography>
          </Stack>
        </Grid>
      </Grid>

      {!noImage && (
        <Typography color="text.secondary" fontWeight="300">
          Uploaded Image
        </Typography>
      )}

      <Grid2 container spacing={1}>
        {image1 && (
          <Grid2 size={{ xs: 12, lg: 4 }}>
            <PhotoPreview file={image1} />
          </Grid2>
        )}

        {image2 && (
          <Grid2 size={{ xs: 12, lg: 4 }}>
            <PhotoPreview file={image2} />
          </Grid2>
        )}

        {image3 && (
          <Grid2 size={{ xs: 12, lg: 4 }}>
            <PhotoPreview file={image3} />
          </Grid2>
        )}
      </Grid2>

      {deliveryNote && (
        <Stack gap={0.5}>
          <Typography variant="body2" color="text.secondary">
            Delivery Note
          </Typography>
          <Typography>{deliveryNote}</Typography>
        </Stack>
      )}

      {isMobile && (
        <Stack gap={2} my={1}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            loading={isPending}
            loadingIndicator={<CircularProgress size={22} />}
          >
            Save
          </Button>

          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            Back
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
