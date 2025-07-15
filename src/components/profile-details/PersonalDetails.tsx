import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid2,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { Profile, ProfileFormValues } from "../../types/user.ts";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../profile-form/validation.ts";
import { useMutation } from "@tanstack/react-query";
import { Country, IState, State } from "country-state-city";
import Grid from "@mui/material/Grid2";
import { MuiTelInput } from "mui-tel-input";
import Autocomplete from "@mui/material/Autocomplete";
import { updateUser } from "../../api/user.ts";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUserContext } from "../../context/user/util.ts";

type Props = {
  data: Profile;
};

export const PersonalDetails = ({ data }: Props) => {
  const { refetchProfile } = useUserContext();
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg"),
  );
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
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      state: data.state,
      country_code: data.country_code,
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (payload: ProfileFormValues) => updateUser(data.id, payload),
    onSuccess: () => {
      // TODO: use notification
      refetchProfile();
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
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 3 }}>
          <Stack gap={3}>
            <Stack gap={1.5}>
              <Typography variant="subtitle2">Personal Information</Typography>
              <Typography variant="body2" color="text.secondary">
                These are your personal details, they are visible to the public
              </Typography>
            </Stack>

            {!isMobile && (
              <Box>
                <Button
                  variant="contained"
                  disabled={isPending}
                  loading={isPending}
                  type="submit"
                  data-testid="lg-button"
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                >
                  Save changes
                </Button>
              </Box>
            )}
          </Stack>
        </Grid2>

        <Grid2
          size={{ xs: 12, lg: 7 }}
          offset={{ xs: 0, lg: 2 }}
          order={{ xs: 1, lg: 2 }}
        >
          <Grid container spacing={1.5}>
            {isError && (
              <Grid size={{ xs: 12 }}>
                <Alert severity="error" variant="filled">
                  {error?.message}
                </Alert>
              </Grid>
            )}
            <Grid size={{ xs: 12, lg: 6 }}>
              <InputLabel htmlFor="firstname" size="small">
                First Name
              </InputLabel>
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="firstname"
                    name="firstname"
                    size="small"
                    fullWidth
                    placeholder="First Name"
                    error={Boolean(errors.firstname)}
                    helperText={errors.firstname?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <InputLabel htmlFor="lastname" size="small">
                Last Name
              </InputLabel>
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="lastname"
                    name="lastname"
                    size="small"
                    fullWidth
                    placeholder="Last Name"
                    error={Boolean(errors.lastname)}
                    helperText={errors.lastname?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <InputLabel htmlFor="email" size="small">
                Email
              </InputLabel>
              <TextField
                id="email"
                name="email"
                size="small"
                fullWidth
                placeholder="Email"
                disabled
                value={data.email}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <InputLabel htmlFor="phoneNumber" size="small">
                Phone Number
              </InputLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <MuiTelInput
                    {...field}
                    id="phone"
                    fullWidth
                    size="small"
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
              <InputLabel htmlFor="country_code" size="small">
                Country of Residence
              </InputLabel>
              <Controller
                name="country_code"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    id="country"
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    value={
                      countries.find((c) => c.name === field.value) || null
                    }
                    onChange={(_, value) => {
                      setValue("country_code", value?.name || "");
                      setValue("state", "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
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
              <InputLabel htmlFor="state" size="small">
                State of Residence
              </InputLabel>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="state"
                    size="small"
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

            {isMobile && (
              <Grid size={{ xs: 12 }}>
                <Button
                  variant="contained"
                  disabled={isPending}
                  loading={isPending}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  sx={{ mt: 1 }}
                  type="submit"
                  data-testid="mobile-button"
                >
                  Save changes
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid2>
      </Grid2>
    </form>
  );
};
