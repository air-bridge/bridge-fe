import { Box, Stack, Typography } from "@mui/material";
import { HomepageTabs } from "../../../components/homepage-tabs";

const OrdersScreen = () => {
  return (
    <Stack gap={2}>
      <HomepageTabs />

      <Box>
        <Typography variant="subtitle1">Orders</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, sed.
        </Typography>
      </Box>
    </Stack>
  );
};

export default OrdersScreen;
