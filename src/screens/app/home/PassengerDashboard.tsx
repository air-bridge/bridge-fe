import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { orders } from "../../../mocks/order.ts";
import { EmptyService } from "../../../components/service-list/EmptyService.tsx";
import { ServiceList } from "../../../components/service-list";
import { useQuery } from "@tanstack/react-query";
import { getPassengerDashboard } from "../../../api/dashboard.ts";
import { useMemo } from "react";
import { useUserContext } from "../../../context/user/util.ts";
import { OverviewStats } from "../../../components/stats/OverViewStats.tsx";

type Props = {
  count?: number;
};

export const PassengerDashboard = ({ count = 0 }: Props) => {
  const { isPassenger } = useUserContext();
  // TODO: switch to api count
  const homeOrders = orders.slice(0, 2);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["passenger-overview-stats", isPassenger],
    queryFn: getPassengerDashboard,
    enabled: !!isPassenger,
  });

  const stats = useMemo(() => {
    if (data) {
      return [
        {
          name: "Total Service",
          count: data.total_services,
          background: "info.light",
          color: "primary.main",
        },
        {
          name: "Active Service",
          count: data.active_services,
          background: "warning.light",
          color: "warning.main",
        },
        {
          name: "Total Request",
          count: data.total_requests,
          background: "success.light",
          color: "success.main",
        },
      ];
    }

    return [];
  }, [data]);

  return (
    <>
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
          <Typography variant="body1">My Services</Typography>

          {count > 0 && (
            <Typography
              variant="body2"
              component={Link}
              to="/services"
              color="primary.main"
            >
              See All
            </Typography>
          )}
        </Stack>

        {count === 0 ? <EmptyService /> : <ServiceList orders={homeOrders} />}
      </Stack>
    </>
  );
};
