import {
  TextField,
  Button,
  Box,
  InputLabel,
  Stack,
  Typography,
  Grid2,
  Theme,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Controller, useFormContext } from "react-hook-form";
import { luggageCategories } from "./util.ts";
import { OrderFormValues } from "../../types/order.ts";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { PhotoInput } from "../photo-input";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Country } from "country-state-city";
import { useMemo } from "react";
import { getStates } from "../../utils/country-state.ts";
import Autocomplete from "@mui/material/Autocomplete";
import { MuiTelInput } from "mui-tel-input";
import { ButtonChip } from "../button-chip";
import InfoOutlineIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  editMode?: boolean;
  onSetShowReview: () => void;
  isPending: boolean;
};
export const OrderForm = ({ editMode, isPending, onSetShowReview }: Props) => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  const countries = Country.getAllCountries();
  const packageType = watch("package_type");
  const receiverPhone = watch("receiver_phone");

  // Watch for country changes to update state options
  const selectedDestinationCountry = watch("destination_country");
  const selectedPickupCountry = watch("pickup_country");
  const image1 = watch("image1");
  const image2 = watch("image2");
  const image3 = watch("image3");

  const pickupStateOptions = useMemo(() => {
    if (!selectedPickupCountry) {
      return [];
    }

    const country = countries.find(
      (c) => c.name.toLowerCase() === selectedPickupCountry.toLowerCase(),
    );
    return getStates(country?.isoCode);
  }, [selectedPickupCountry]);

  const destinationStateOptions = useMemo(() => {
    if (!selectedPickupCountry) {
      return [];
    }

    const country = countries.find(
      (c) => c.name.toLowerCase() === selectedDestinationCountry.toLowerCase(),
    );
    return getStates(country?.isoCode);
  }, [selectedDestinationCountry]);

  const customSetInputValue = (name: keyof OrderFormValues, value: string) => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <Stack gap={{ xs: 2, lg: 3 }}>
      <Box>
        <InputLabel>Package Type</InputLabel>
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
          {luggageCategories.map((category) => {
            const isSelected = packageType.includes(category.value);
            return (
              <ButtonChip
                selected={isSelected}
                label={category.name}
                Icon={category.icon}
                onClick={() => {
                  if (isSelected) {
                    const newValues = packageType.filter(
                      (p) => p !== category.value,
                    );
                    setValue("package_type", [...newValues]);
                  } else {
                    setValue("package_type", [...packageType, category.value]);
                  }
                }}
              />
            );
          })}
        </Stack>
        {errors.package_type && (
          <FormHelperText error>{errors.package_type?.message}</FormHelperText>
        )}
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
                <Stack direction="row" gap={1} alignItems="center">
                  <InputLabel htmlFor="weight">Package weight (KG)</InputLabel>
                  <Tooltip title="The minimum weight allowed is 1KG">
                    <InfoOutlineIcon sx={{ fontSize: 16, mb: "5px" }} />
                  </Tooltip>
                </Stack>
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
                <Controller
                  {...field}
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="country"
                      options={countries}
                      getOptionLabel={(option) => option.name}
                      value={
                        countries.find(
                          (c) =>
                            c.name.toLowerCase() === field.value.toLowerCase(),
                        ) || null
                      }
                      onChange={(_, value) => {
                        customSetInputValue(
                          "pickup_country",
                          value?.name || "",
                        );
                        customSetInputValue("pickup_state", "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Select country"
                          error={!!errors.pickup_country}
                          helperText={errors.pickup_country?.message}
                        />
                      )}
                    />
                  )}
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
                <Controller
                  {...field}
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="state"
                      options={pickupStateOptions}
                      getOptionLabel={(option) => option.name}
                      value={
                        pickupStateOptions.find(
                          (c) =>
                            c.name.toLowerCase() === field.value.toLowerCase(),
                        ) || null
                      }
                      onChange={(_, value) => {
                        customSetInputValue("pickup_state", value?.name || "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Select state"
                          error={!!errors.pickup_state}
                          helperText={errors.pickup_state?.message}
                        />
                      )}
                    />
                  )}
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
                <Controller
                  {...field}
                  control={control}
                  render={({ field }) => (
                    <MuiTelInput
                      {...field}
                      id="receiver_phone"
                      value={receiverPhone || ""}
                      fullWidth
                      forceCallingCode
                      defaultCountry="NG"
                      preferredCountries={["NG", "DE", "GB"]}
                      placeholder="Phone Number"
                      error={Boolean(errors.receiver_phone)}
                      helperText={errors.receiver_phone?.message}
                      onChange={field.onChange}
                    />
                  )}
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
                  {...field}
                  id="destination_address"
                  variant="outlined"
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
                <InputLabel htmlFor="pickup_country">Country</InputLabel>
                <Controller
                  {...field}
                  name="destination_country"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="country"
                      options={countries}
                      getOptionLabel={(option) => option.name}
                      value={
                        countries.find(
                          (c) =>
                            c.name.toLowerCase() === field.value.toLowerCase(),
                        ) || null
                      }
                      onChange={(_, value) => {
                        customSetInputValue(
                          "destination_country",
                          value?.name || "",
                        );
                        customSetInputValue("destination_state", "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Select country"
                          error={!!errors.destination_country}
                          helperText={errors.destination_country?.message}
                        />
                      )}
                    />
                  )}
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
                <InputLabel htmlFor="pickup_state">State</InputLabel>
                <Controller
                  {...field}
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="state"
                      options={destinationStateOptions}
                      getOptionLabel={(option) => option.name}
                      value={
                        destinationStateOptions.find(
                          (c) =>
                            c.name.toLowerCase() === field.value.toLowerCase(),
                        ) || null
                      }
                      onChange={(_, value) => {
                        customSetInputValue(
                          "destination_state",
                          value?.name || "",
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Select state"
                          error={!!errors.destination_state}
                          helperText={errors.destination_state?.message}
                        />
                      )}
                    />
                  )}
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
        <Grid2 size={{ xs: 4 }}>
          <PhotoInput
            editable={!editMode}
            onChange={(file) => setValue("image1", file)}
            file={image1}
          />
        </Grid2>
        <Grid2 size={{ xs: 4 }}>
          <PhotoInput
            editable={!editMode}
            onChange={(file) => setValue("image2", file)}
            file={image2}
          />
        </Grid2>
        <Grid2 size={{ xs: 4 }}>
          <PhotoInput
            editable={!editMode}
            onChange={(file) => setValue("image3", file)}
            file={image3}
          />
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
              rows={3}
              multiline
              error={!!errors.delivery_note}
              helperText={errors.delivery_note?.message}
            />
          </Box>
        )}
      />

      {isMobile && (
        <Stack gap={2} my={1}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              onSetShowReview();
            }}
            loading={isPending}
            loadingIndicator={<CircularProgress size={22} />}
          >
            Review
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            loading={isPending}
            loadingIndicator={<CircularProgress size={22} />}
          >
            Save for later
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
