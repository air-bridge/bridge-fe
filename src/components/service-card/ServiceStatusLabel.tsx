import { ServiceStatus } from "../../types/service.ts";
import { Chip, ChipProps } from "@mui/material";

type Props = {
  status: ServiceStatus;
};

const chipColor: Record<ServiceStatus, ChipProps["color"]> = {
  [ServiceStatus.Draft]: "secondary",
  [ServiceStatus.Open]: "info",
  [ServiceStatus.Active]: "warning",
  [ServiceStatus.Matched]: "success",
  [ServiceStatus.Completed]: "success",
  [ServiceStatus.Stale]: "error",
};

export const ServiceStatusLabel = ({ status }: Props) => {
  return (
    <Chip
      label={status}
      size="small"
      color={chipColor[status]}
      sx={{ textTransform: "capitalize" }}
    />
  );
};
