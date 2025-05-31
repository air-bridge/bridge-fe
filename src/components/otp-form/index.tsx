import { useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, TextField, Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

type Props = {
  mobile?: boolean;
};
export const OTPForm = ({ mobile }: Props) => {
  const isMobile =
    mobile || useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const navigate = useNavigate();
  const handleOtp = () => {
    navigate("/auth/profile-data");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Box display="flex" gap={1}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              slotProps={{
                htmlInput: {
                  maxLength: 1,
                  style: {
                    fontSize: "22px",
                    height: isMobile ? 55 : 62,
                    textAlign: "center",
                    fontWeight: 700,
                    padding: 0,
                  },
                  inputMode: "numeric",
                },
              }}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputRef={(el) => (inputRefs.current[index] = el)}
              variant="outlined"
              size="medium"
              sx={{
                fieldset: {
                  borderRadius: 2,
                },
              }}
            />
          ))}
        </Box>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleOtp}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
