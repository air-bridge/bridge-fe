import { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CheckBox, Visibility, VisibilityOff } from "@mui/icons-material";

export const SignUpForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleShowPassword = () => setIsPasswordVisible(!isPasswordVisible);
  const handleShowConfirmPassword = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <TextField fullWidth name="email" placeholder="Email" />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Stack gap={1}>
          <TextField
            type={isPasswordVisible ? "text" : "password"}
            fullWidth
            name="password"
            placeholder="Password"
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
          <Typography color="text.secondary" variant="body2">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </Typography>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          type={isConfirmPasswordVisible ? "text" : "password"}
          name="confirmPassword"
          placeholder="Repeat Password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      isConfirmPasswordVisible
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleShowConfirmPassword}
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
      <Grid size={{ xs: 12 }} sx={{ pl: 1 }}>
        <FormControlLabel
          control={<CheckBox color="info" />}
          name="terms"
          label={
            <Typography variant="body2">
              By clicking signup, you agree to Airbridge{" "}
              <Link to="/">terms & condition Policy</Link>
            </Typography>
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Button fullWidth variant="contained" color="primary" size="large">
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};
