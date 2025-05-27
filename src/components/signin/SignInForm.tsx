import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import { LoginFormValues } from "../../types/auth.ts";
import { validationSchema } from "./validation.ts";

export const SignInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleShowPassword = () => setIsPasswordVisible(!isPasswordVisible);

  const initialValues = {
    email: "test@mail.com",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: LoginFormValues) => {
        console.log(values);
      }}
      validationSchema={validationSchema}
      validateOnBlur
      validateOnChange={false}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                type={isPasswordVisible ? "text" : "password"}
                fullWidth
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            isPasswordVisible
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {isPasswordVisible ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff color="disabled" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button fullWidth variant="contained" color="primary">
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
