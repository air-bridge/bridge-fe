import {
  TextField,
  Button,
  Box,
  InputLabel,
  Stack,
  Typography,
  Grid2,
  Theme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Controller, useFormContext } from "react-hook-form";
import { luggageCategories } from "./util.ts";
import { OrderFormValues } from "../../types/order.ts";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { PhotoInput } from "../photo-input";
import useMediaQuery from "@mui/material/useMediaQuery";

export const OrderForm = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  const packageType = watch("package_type");

  return (
    <Stack gap={{ xs: 2, lg: 3 }}>
      <Box>
        <InputLabel>Luggage Type</InputLabel>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            paddingBottom: 1,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {luggageCategories.map((category) => (
            <Button
              key={category.value}
              variant="outlined"
              color={packageType === category.value ? "primary" : "secondary"}
              size="small"
              startIcon={<category.icon />}
              onClick={() => setValue("package_type", category.value)}
              sx={{ flexShrink: 0 }}
            >
              {category.name}
            </Button>
          ))}
        </Stack>
      </Box>

      <Grid container spacing={{ xs: 1, lg: 2 }}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="title">
                  Order Title (e.g I want to deliver a 3kg box)
                </InputLabel>
                <TextField
                  id="title"
                  variant="outlined"
                  {...field}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  fullWidth
                />
              </Box>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="weight">Package weight (KG)</InputLabel>
                <TextField
                  {...field}
                  id="weight"
                  variant="outlined"
                  type="number"
                  error={!!errors.weight}
                  helperText={errors.weight?.message}
                  fullWidth
                />
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2" sx={{ py: 1.5 }}>
            Sender
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="pickup_address"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="origin">From (Pickup address)</InputLabel>
                <TextField
                  {...field}
                  id="origin"
                  variant="outlined"
                  fullWidth
                  error={!!errors.pickup_address}
                  helperText={errors.pickup_address?.message}
                />
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Controller
            name="pickup_country"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="pickup_country">Country</InputLabel>
                <TextField
                  id="pickup_country"
                  variant="outlined"
                  {...field}
                  fullWidth
                  error={!!errors.pickup_country}
                  helperText={errors.pickup_country?.message}
                />
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Controller
            name="pickup_state"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="pickup_state">State</InputLabel>
                <TextField
                  id="pickup_state"
                  variant="outlined"
                  {...field}
                  fullWidth
                  error={!!errors.pickup_state}
                  helperText={errors.pickup_state?.message}
                />
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2" sx={{ py: 1.5 }}>
            Receiver
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Controller
            name="receiver_firstname"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="receiver_firstname">First name</InputLabel>
                <TextField
                  id="receiver_firstname"
                  variant="outlined"
                  {...field}
                  fullWidth
                  error={!!errors.receiver_firstname}
                  helperText={errors.receiver_firstname?.message}
                />
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Controller
            name="receiver_lastname"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="receiver_lastname">Last name</InputLabel>
                <TextField
                  id="receiver_lastname"
                  variant="outlined"
                  {...field}
                  fullWidth
                  error={!!errors.receiver_lastname}
                  helperText={errors.receiver_lastname?.message}
                />
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="receiver_phone"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="receiver_phone">Phone</InputLabel>
                <TextField
                  id="receiver_phone"
                  variant="outlined"
                  {...field}
                  fullWidth
                  error={!!errors.receiver_phone}
                  helperText={errors.receiver_phone?.message}
                />
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="destination_address"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="destination_address">
                  Delivery Address
                </InputLabel>
                <TextField
                  id="destination_address"
                  variant="outlined"
                  {...field}
                  fullWidth
                  error={!!errors.destination_address}
                  helperText={errors.destination_address?.message}
                />
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Controller
            name="destination_country"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="destination_country">Country</InputLabel>
                <TextField
                  id="destination_country"
                  variant="outlined"
                  {...field}
                  fullWidth
                  error={!!errors.destination_country}
                  helperText={errors.destination_country?.message}
                />
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Controller
            name="destination_state"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="destination_state">State</InputLabel>
                <TextField
                  id="destination_state"
                  variant="outlined"
                  {...field}
                  fullWidth
                  error={!!errors.destination_state}
                  helperText={errors.destination_state?.message}
                />
              </Box>
            )}
          />
        </Grid>
      </Grid>

      <Typography variant="subtitle2" color="text.secondary" fontWeight="300">
        Upload Information
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          border: "solid 1px",
          borderColor: "grey.300",
          borderRadius: 2,
          px: 2.5,
          py: 2,
        }}
      >
        <Stack alignItems="center" gap={0.75} direction="row">
          <Typography color="text.secondary">Picture</Typography>

          <Typography sx={{ color: "grey.900" }}>Attach File</Typography>
        </Stack>

        <FileUploadIcon sx={{ color: "text.primary" }} />
      </Stack>

      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <PhotoInput />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <PhotoInput />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <PhotoInput />
        </Grid2>
      </Grid2>

      <Controller
        name="delivery_note"
        control={control}
        render={({ field }) => (
          <Box>
            <InputLabel htmlFor="delivery_note">Additional Note</InputLabel>
            <TextField
              id="delivery_note"
              variant="outlined"
              {...field}
              fullWidth
              multiline
              error={!!errors.delivery_note}
              helperText={errors.delivery_note?.message}
            />
          </Box>
        )}
      />

      {isMobile && (
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      )}
    </Stack>
  );
};
