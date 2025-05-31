import Grid from "@mui/material/Grid2";
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { ForgotPasswordFormValues } from "../../types/auth.ts";
import { validationSchema } from "./validation.ts";

export const ForgotPasswordForm = () => {
  const initialValues = {
    email: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: ForgotPasswordFormValues) => {
        console.log(values);
      }}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange={false}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
