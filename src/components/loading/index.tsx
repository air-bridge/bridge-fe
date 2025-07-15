import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <CircularProgress size={40} />
    </Box>
  );
};
