import { Stack, Typography } from "@mui/material";
import { HomepageTabs } from "../../../components/homepage-tabs";
import { OverviewStats } from "../../../components/stats/OverViewStats.tsx";
import { Link } from "react-router-dom";
import { OrderList } from "../../../components/order-list";
import { EmptyOrder } from "../../../components/order-list/EmptyOrder.tsx";
import { orders } from "../../../mocks/order.ts";

type Props = {
  count?: number;
};
const HomeScreen = ({ count = 0 }: Props) => {
  // TODO: switch to api count
  const homeOrders = orders.slice(0, 2);

  return (
    <Stack gap={2}>
      <HomepageTabs showAction={count > 0} />

      <OverviewStats />

      <Stack gap={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            pb: 0.5,
            borderBottom: "solid 1px",
            borderBottomColor: "grey.300",
          }}
        >
          <Typography variant="body1">My Parcel</Typography>

          {count > 0 && (
            <Typography
              variant="body2"
              component={Link}
              to="/orders"
              color="primary.main"
            >
              See All
            </Typography>
          )}
        </Stack>

        {count === 0 ? <EmptyOrder /> : <OrderList orders={homeOrders} />}
      </Stack>
    </Stack>
  );
};

export default HomeScreen;
