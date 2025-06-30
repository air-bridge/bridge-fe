import { useEffect, useState } from "react";
import { Country, IState, State } from "country-state-city";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid2";
import { MuiTelInput } from "mui-tel-input";
import { Button, TextField, MenuItem, InputLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation.ts";
import { ProfileFormValues } from "../../types/user.ts";
import { useRegistrationContext } from "../../context/registration/util.ts";

type Props = {
  onNext: () => void;
};

export const ProfileForm = ({ onNext }: Props) => {
  const { payload, setRegistrationInfo } = useRegistrationContext();
  const countries = Country.getAllCountries();
  const [stateOptions, setStateOptions] = useState<IState[]>([]);

  const getStates = (countryIsoCode?: string | null) => {
    if (countryIsoCode) {
      const countryStates = State.getStatesOfCountry(countryIsoCode);
      setStateOptions(countryStates);
    } else {
      setStateOptions([]);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      firstName: payload.firstName || "",
      lastName: payload.lastName || "",
      phoneNumber: payload.phoneNumber || "",
      country: payload.country || "",
      state: payload.state || "",
    },
  });

  // Watch for country changes to update state options
  const selectedCountry = watch("country");
  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c.name === selectedCountry);
      if (country) getStates(country.isoCode);
    } else {
      setStateOptions([]);
    }
  }, [selectedCountry]);

  const onSubmit = (values: ProfileFormValues) => {
    setRegistrationInfo(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="firstName"
                name="firstName"
                fullWidth
                placeholder="First Name"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="lastName"
                name="lastName"
                fullWidth
                placeholder="Last Name"
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <MuiTelInput
                {...field}
                id="phoneNumber"
                fullWidth
                name="phoneNumber"
                forceCallingCode
                defaultCountry="NG"
                preferredCountries={["NG", "DE", "GB"]}
                placeholder="Phone Number"
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber?.message}
                onChange={field.onChange}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel htmlFor="country">Country of Residence</InputLabel>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Autocomplete
                id="country"
                options={countries}
                getOptionLabel={(option) => option.name}
                value={countries.find((c) => c.name === field.value) || null}
                onChange={(_, value) => {
                  setValue("country", value?.name || "");
                  setValue("state", "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select country"
                    error={Boolean(errors.country)}
                    helperText={errors.country?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel htmlFor="state">State of Residence</InputLabel>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="state"
                name="state"
                select
                fullWidth
                placeholder="State of Residence"
                slotProps={{
                  htmlInput: {
                    "aria-label": "State of Residence",
                  },
                }}
                error={Boolean(errors.state)}
                helperText={errors.state?.message}
              >
                {stateOptions.map((option) => (
                  <MenuItem key={option.isoCode} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Continue
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
