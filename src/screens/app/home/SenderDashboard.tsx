import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { OrderList } from "../../../components/order-list";
import { EmptyOrder } from "../../../components/order-list/EmptyOrder.tsx";
import { useUserContext } from "../../../context/user/util.ts";
import { useQuery } from "@tanstack/react-query";
import { getSenderDashboard } from "../../../api/dashboard.ts";
import { OverviewStats } from "../../../components/stats/OverViewStats.tsx";
import { useMemo } from "react";
import { HomepageTabs } from "../../../components/homepage-tabs";

export const SenderDashboard = () => {
  const { isSender } = useUserContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sender-overview-stats", isSender],
    queryFn: getSenderDashboard,
    enabled: !!isSender,
  });

  const stats = useMemo(() => {
    if (data) {
      return [
        {
          name: "Total Request",
          count: data.total_requests,
          background: "info.light",
          color: "primary.main",
        },
        {
          name: "Active Request",
          count: data.active_requests,
          background: "warning.light",
          color: "warning.main",
        },
        {
          name: "Successful Sent Goods",
          count: data.completed_orders,
          background: "success.light",
          color: "success.main",
        },
      ];
    }

    return [];
  }, [data]);

  const recentOrders = data?.recent_orders || [];
  const ordersCount = recentOrders.length || 0;
  const isEmpty = ordersCount === 0;

  return (
    <>
      <HomepageTabs showAction={!isEmpty} />
      <OverviewStats data={stats} isError={isError} isLoading={isLoading} />
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

          {!isEmpty && (
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

        {isEmpty ? <EmptyOrder /> : <OrderList orders={recentOrders} />}
      </Stack>
    </>
  );
};
