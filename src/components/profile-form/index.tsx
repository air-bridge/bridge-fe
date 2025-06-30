import { useEffect, useState } from "react";
import { Country, IState, State } from "country-state-city";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid2";
import { MuiTelInput } from "mui-tel-input";
import {
  Button,
  TextField,
  MenuItem,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation.ts";
import { ProfileFormValues } from "../../types/user.ts";
import { useRegistrationContext } from "../../context/registration/util.ts";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth.ts";
import { setUserAuth } from "../../utils/userAuth.ts";

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
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      firstname: payload.firstname || "",
      lastname: payload.lastname || "",
      phone: payload.phone || "",
      country_code: payload.country_code || "",
      state: payload.state || "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setUserAuth(data);
      onNext();
    },
  });

  // Watch for country changes to update state options
  const selectedCountry = watch("country_code");
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
    mutate({ ...payload, ...values });
  };

  const isLoading = isSubmitting || isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && (
        <Grid size={{ xs: 12 }}>
          <Alert severity="error" variant="filled">
            {error?.message}
          </Alert>
        </Grid>
      )}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <InputLabel htmlFor="firstname">First Name</InputLabel>
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="firstname"
                name="firstname"
                fullWidth
                placeholder="First Name"
                error={Boolean(errors.firstname)}
                helperText={errors.firstname?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel htmlFor="lastname">Last Name</InputLabel>
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="lastname"
                name="lastname"
                fullWidth
                placeholder="Last Name"
                error={Boolean(errors.lastname)}
                helperText={errors.lastname?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MuiTelInput
                {...field}
                id="phone"
                fullWidth
                name="phone"
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
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel htmlFor="country_code">Country of Residence</InputLabel>
          <Controller
            name="country_code"
            control={control}
            render={({ field }) => (
              <Autocomplete
                id="country"
                options={countries}
                getOptionLabel={(option) => option.name}
                value={countries.find((c) => c.name === field.value) || null}
                onChange={(_, value) => {
                  setValue("country_code", value?.name || "");
                  setValue("state", "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select country"
                    error={Boolean(errors.country_code)}
                    helperText={errors.country_code?.message}
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
