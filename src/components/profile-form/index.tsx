import { useEffect, useState } from "react";
import { Country, IState, State } from "country-state-city";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid2";
import { MuiTelInput } from "mui-tel-input";
import { Button, TextField, MenuItem, InputLabel } from "@mui/material";
import { Formik } from "formik";
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

  useEffect(() => {
    if (payload.country) {
      const country = countries.find((c) => c.name === payload.country);
      if (country) getStates(country.isoCode);
    }
  }, [payload.country]);

  const initialValues: ProfileFormValues = {
    firstName: payload.firstName || "",
    lastName: payload.lastName || "",
    phoneNumber: payload.phoneNumber || "",
    country: payload.country || "",
    state: payload.state || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange={false}
      onSubmit={(values) => {
        setRegistrationInfo(values);
        onNext();
      }}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        validateField,
        values,
        errors,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <TextField
                id="firstName"
                name="firstName"
                fullWidth
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                onBlur={() => void validateField("firstName")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <TextField
                id="lastName"
                name="lastName"
                fullWidth
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                onBlur={() => void validateField("lastName")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
              <MuiTelInput
                id="phoneNumber"
                fullWidth
                name="phoneNumber"
                forceCallingCode
                defaultCountry="NG"
                preferredCountries={["NG", "DE", "GB"]}
                placeholder="Phone Number"
                value={values.phoneNumber}
                onChange={(value) => {
                  void setFieldValue("phoneNumber", value);
                }}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
                onBlur={() => void validateField("phoneNumber")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="country">Country of Residence</InputLabel>
              <Autocomplete
                id="country"
                options={countries}
                getOptionLabel={(option) => option.name}
                value={countries.find((c) => c.name === values.country) || null}
                onChange={(_, value) => {
                  getStates(value?.isoCode);
                  void setFieldValue("country", value?.name || "");
                  void setFieldValue("state", "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select country"
                    error={Boolean(errors.country)}
                    helperText={errors.country}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="state">State of Residence</InputLabel>
              <TextField
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
                value={values.state}
                onChange={handleChange}
                error={Boolean(errors.state)}
                helperText={errors.state}
                onBlur={() => void validateField("state")}
              >
                {stateOptions.map((option) => (
                  <MenuItem key={option.isoCode} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
