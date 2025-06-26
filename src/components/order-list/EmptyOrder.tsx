import { Stack, Button, Typography, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import emptyOrder from "../../assets/images/empty-order.png";
import { Link } from "react-router-dom";

export const EmptyOrder = () => {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      gap={{ xs: 3, lg: 6 }}
      justifyContent="center"
      alignItems="center"
    >
      <img src={emptyOrder} width={290} alt="empty order" />
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="subtitle1"
          mb={2.5}
          textAlign="center"
          fontWeight={400}
        >
          You do not have any order yet
        </Typography>
        <Button
          component={Link}
          to="/create-order"
          variant="contained"
          size="large"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
        >
          Create Order
        </Button>
      </Box>
    </Stack>
  );
};
