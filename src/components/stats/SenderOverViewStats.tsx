import { useQuery } from "@tanstack/react-query";
import { senderDashboard } from "../../api/dashboard.ts";
import { useMemo } from "react";
import { OverviewStats } from "./OverViewStats.tsx";

export const SenderOverviewStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["sender-overview-stats"],
    queryFn: senderDashboard,
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

  return <OverviewStats data={stats} isLoading={isLoading} />;
};
