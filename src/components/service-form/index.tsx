import {
  TextField,
  Button,
  Box,
  InputLabel,
  Stack,
  Typography,
  Theme,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Controller, useFormContext } from "react-hook-form";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Country } from "country-state-city";
import { useMemo } from "react";
import { getStates } from "../../utils/country-state.ts";
import Autocomplete from "@mui/material/Autocomplete";
import { ServiceFormValues } from "../../types/service.ts";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MuiTelInput } from "mui-tel-input";
import { transportTypes } from "./util.ts";

export const ServiceForm = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ServiceFormValues>();

  const countries = Country.getAllCountries();
  const phone = watch("phone");

  // Watch for country changes to update state options
  const selectedArrivalCountry = watch("arrival_country");
  const selectedDepartureCountry = watch("departure_country");
  const departureDate = watch("departure_date");
  const arrivalDate = watch("arrival_date");
  const transportType = watch("transport_type");

  const departureStateOptions = useMemo(() => {
    if (!selectedDepartureCountry) {
      return [];
    }

    const country = countries.find(
      (c) => c.name.toLowerCase() === selectedDepartureCountry.toLowerCase(),
    );
    return getStates(country?.isoCode);
  }, [selectedDepartureCountry]);

  const arrivalStateOptions = useMemo(() => {
    if (!selectedArrivalCountry) {
      return [];
    }

    const country = countries.find(
      (c) => c.name.toLowerCase() === selectedArrivalCountry.toLowerCase(),
    );
    return getStates(country?.isoCode);
  }, [selectedArrivalCountry]);

  const customSetInputValue = (
    name: keyof ServiceFormValues,
    value: string,
  ) => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <Stack gap={{ xs: 2, lg: 3 }}>
      <Grid container spacing={{ xs: 1, lg: 2 }}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="title">
                  Service Title (e.g I have 3kg space available)
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
                <InputLabel htmlFor="weight">Available weight (KG)</InputLabel>
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
          <Controller
            name="price_per_kg"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="weight">Price per KG</InputLabel>
                <TextField
                  {...field}
                  id="price_per_kg"
                  variant="outlined"
                  type="number"
                  error={!!errors.price_per_kg}
                  helperText={errors.price_per_kg?.message}
                  fullWidth
                />
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="departure_date"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="departure_date">Departure date</InputLabel>
                <Controller
                  {...field}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={departureDate ? dayjs(departureDate) : null}
                      sx={{
                        width: "100%",
                      }}
                      format="YYYY-MM-DD"
                      disablePast
                      onChange={(date) => {
                        customSetInputValue(
                          "departure_date",
                          dayjs(date).format("YYYY-MM-DD"),
                        );
                      }}
                    />
                  )}
                />
                {errors.departure_date && (
                  <FormHelperText error>
                    {errors.departure_date?.message}
                  </FormHelperText>
                )}
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="arrival_date"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="arrival_date">Arrival date</InputLabel>
                <Controller
                  {...field}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={arrivalDate ? dayjs(arrivalDate) : null}
                      sx={{
                        width: "100%",
                      }}
                      format="YYYY-MM-DD"
                      disablePast
                      onChange={(date) => {
                        customSetInputValue(
                          "arrival_date",
                          dayjs(date).format("YYYY-MM-DD"),
                        );
                      }}
                    />
                  )}
                />
                {errors.arrival_date && (
                  <FormHelperText error>
                    {errors.arrival_date?.message}
                  </FormHelperText>
                )}
              </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2" sx={{ py: 1.5 }}>
            Destination
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Controller
            name="departure_country"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="departure_country">
                  Departure Country
                </InputLabel>
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
                            c.name.toLowerCase() === field.value?.toLowerCase(),
                        ) || null
                      }
                      onChange={(_, value) => {
                        customSetInputValue(
                          "departure_country",
                          value?.name || "",
                        );
                        customSetInputValue("departure_city", "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Select country"
                          error={!!errors.departure_country}
                          helperText={errors.departure_country?.message}
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
            name="departure_city"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="departure_city">Departure City</InputLabel>
                <Controller
                  {...field}
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="state"
                      options={departureStateOptions}
                      getOptionLabel={(option) => option.name}
                      value={
                        departureStateOptions.find(
                          (c) =>
                            c.name.toLowerCase() === field.value.toLowerCase(),
                        ) || null
                      }
                      onChange={(_, value) => {
                        customSetInputValue(
                          "departure_city",
                          value?.name || "",
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Select city"
                          error={!!errors.departure_city}
                          helperText={errors.departure_city?.message}
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
            name="arrival_country"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="arrival_country">
                  Arrival Country
                </InputLabel>
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
                            c.name.toLowerCase() === field.value?.toLowerCase(),
                        ) || null
                      }
                      onChange={(_, value) => {
                        customSetInputValue(
                          "arrival_country",
                          value?.name || "",
                        );
                        customSetInputValue("arrival_city", "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Select country"
                          error={!!errors.arrival_country}
                          helperText={errors.arrival_country?.message}
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
            name="arrival_city"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="departure_city">Arrival City</InputLabel>
                <Controller
                  {...field}
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="state"
                      options={arrivalStateOptions}
                      getOptionLabel={(option) => option.name}
                      value={
                        arrivalStateOptions.find(
                          (c) =>
                            c.name.toLowerCase() === field.value.toLowerCase(),
                        ) || null
                      }
                      onChange={(_, value) => {
                        customSetInputValue("arrival_city", value?.name || "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Select city"
                          error={!!errors.arrival_city}
                          helperText={errors.arrival_city?.message}
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
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Controller
                  {...field}
                  control={control}
                  render={({ field }) => (
                    <MuiTelInput
                      {...field}
                      id="receiver_phone"
                      value={phone || ""}
                      fullWidth
                      forceCallingCode
                      defaultCountry="NG"
                      preferredCountries={["NG", "DE", "GB"]}
                      placeholder="Phone Number"
                      error={Boolean(errors.phone)}
                      helperText={errors.phone?.message}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Box>
            )}
          />
        </Grid>

        <Box>
          <InputLabel>Transport Type</InputLabel>
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
            {transportTypes.map((category) => {
              const isSelected = transportType === category.value;
              return (
                <Button
                  key={category.value}
                  variant="outlined"
                  color={isSelected ? "primary" : "secondary"}
                  startIcon={<category.icon />}
                  onClick={() => {
                    setValue("transport_type", category.value);
                  }}
                  sx={{ flexShrink: 0 }}
                >
                  {category.name}
                </Button>
              );
            })}
          </Stack>
          {errors.transport_type && (
            <FormHelperText error>
              {errors.transport_type?.message}
            </FormHelperText>
          )}
        </Box>
      </Grid>

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
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      )}
    </Stack>
  );
};
