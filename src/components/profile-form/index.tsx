import Grid from "@mui/material/Grid2";
import { Button, TextField, MenuItem, InputLabel } from "@mui/material";
import { Formik } from "formik";
import { validationSchema } from "./validation.ts";
import { ProfileFormValues } from "../../types/user.ts";
import { useRegistrationContext } from "../../context/registration/util.ts";

// TODO: populate options
const countryOptions = [
  {
    label: "Nigeria",
    value: "ng",
  },
  {
    label: "United Kingdom",
    value: "uk",
  },
  {
    label: "Germany",
    value: "de",
  },
  {
    label: "United State of America",
    value: "us",
  },
];
const stateOptions = [
  {
    label: "Lagos",
    value: "ng",
  },
  {
    label: "Liverpool",
    value: "uk",
  },
  {
    label: "Hamburg",
    value: "hg",
  },
  {
    label: "Washington",
    value: "us",
  },
];

type Props = {
  onNext: () => void;
};

export const ProfileForm = ({ onNext }: Props) => {
  const { payload, setRegistrationInfo } = useRegistrationContext();

  const initialValues = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    phoneNumber: payload.phoneNumber,
    country: payload.country,
    state: payload.state,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: ProfileFormValues) => {
        setRegistrationInfo(values);
        onNext();
      }}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange={false}
    >
      {({ handleChange, handleSubmit, validateField, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <InputLabel id="firstName">First Name</InputLabel>
              <TextField
                fullWidth
                name="firstName"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                onBlur={() => void validateField("firstName")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel id="lastName">Last Name</InputLabel>
              <TextField
                fullWidth
                name="lastName"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                onBlur={() => void validateField("lastName")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel id="phoneNumber">Phone Number</InputLabel>
              <TextField
                fullWidth
                name="phoneNumber"
                placeholder="Phone Number"
                value={values.phoneNumber}
                onChange={handleChange}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
                onBlur={() => void validateField("phoneNumber")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel>Country</InputLabel>
              <TextField
                select
                fullWidth
                name="country"
                placeholder="Country of Residence"
                slotProps={{
                  htmlInput: {
                    "aria-label": "Country of Residence",
                  },
                }}
                data-testid="country-select"
                error={Boolean(errors.country)}
                helperText={errors.country}
                value={values.country}
                onChange={handleChange}
                onBlur={() => void validateField("country")}
              >
                {countryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel>State of Residence</InputLabel>
              <TextField
                select
                fullWidth
                name="state"
                placeholder="State of Residence"
                slotProps={{
                  htmlInput: {
                    "aria-label": "State of Residence",
                  },
                }}
                error={Boolean(errors.state)}
                helperText={errors.state}
                value={values.state}
                onChange={handleChange}
                onBlur={() => void validateField("state")}
              >
                {stateOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
