import { Info } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

type Props = {
  message?: string;
};
export const ErrorInfo = ({ message }: Props) => {
  return (
    <Stack
      gap={1}
      justifyContent="center"
      alignItems="center"
      mt={2}
      sx={{
        width: { xs: "90%", lg: 350 },
        m: "auto",
      }}
    >
      <Info fontSize="large" color="error" />
      <Typography textAlign="center">
        {message ||
          "Please, refresh the page! We are to unable process your request!"}
      </Typography>
    </Stack>
  );
};
