import CarIcon from "@mui/icons-material/DirectionsCarFilled";
import TrainIcon from "@mui/icons-material/DirectionsSubway";
import FlightIcon from "@mui/icons-material/FlightTakeoff";
import BicycleIcon from "@mui/icons-material/PedalBike";
import { ServiceStatus } from "../../types/service.ts";

export const transportTypes = [
  {
    name: "Air",
    icon: FlightIcon,
    value: "air",
  },
  {
    name: "Car",
    icon: CarIcon,
    value: "car",
  },
  {
    name: "Train",
    icon: TrainIcon,
    value: "train",
  },
  {
    name: "Bicycle",
    icon: BicycleIcon,
    value: "bicycle",
  },
];

export const serviceStatusColor: Record<ServiceStatus, string> = {
  [ServiceStatus.Draft]: "grey.500",
  [ServiceStatus.Open]: "info.main",
  [ServiceStatus.Active]: "warning.main",
  [ServiceStatus.Matched]: "success.main",
  [ServiceStatus.Completed]: "success.main",
  [ServiceStatus.Stale]: "error.main",
};
