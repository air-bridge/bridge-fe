import Grid from "@mui/material/Grid2";
import { Button, TextField, MenuItem, InputLabel } from "@mui/material";
import { Formik } from "formik";
import { validationSchema } from "./validation.ts";
import { ProfileFormValues } from "../../types/user.ts";

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
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    state: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: ProfileFormValues) => {
        console.log(values);
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
              <InputLabel id="country">Country</InputLabel>
              <TextField
                select
                fullWidth
                name="country"
                label="Country of Residence"
                placeholder="Country of Residence"
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
              <TextField
                select
                fullWidth
                name="state"
                label="State of Residence"
                placeholder="State of Residence"
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
