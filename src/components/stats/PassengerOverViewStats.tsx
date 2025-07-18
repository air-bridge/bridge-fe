import { useQuery } from "@tanstack/react-query";
import { passengerDashboard } from "../../api/dashboard.ts";
import { useMemo } from "react";
import { OverviewStats } from "./OverViewStats.tsx";

export const PassengerOverviewStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["passenger-overview-stats"],
    queryFn: passengerDashboard,
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

  return <OverviewStats data={stats} isError={isError} isLoading={isLoading} />;
};
