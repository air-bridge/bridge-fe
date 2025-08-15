import CarIcon from "@mui/icons-material/DirectionsCarFilled";
import TrainIcon from "@mui/icons-material/DirectionsSubway";
import FlightIcon from "@mui/icons-material/FlightTakeoff";
import BicycleIcon from "@mui/icons-material/PedalBike";
import { ServiceFormValues, ServiceStatus } from "../../types/service.ts";
import { mixed, number, object, ObjectSchema, string } from "yup";
import dayjs from "dayjs";
import { isValidPhoneNumber } from "../../utils/validate-phone.ts";

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

export const serviceFormSchema: ObjectSchema<ServiceFormValues> = object({
  title: string().required("Title is required"),
  currency: string().required("Currency is required"),
  status: mixed<ServiceStatus>().notRequired().nullable(),
  transport_type: string().notRequired().nullable(),
  weight: number()
    .required("Weight is required")
    .typeError("Weight must be a number")
    .positive("Weight must be a positive number"),
  price_per_kg: number()
    .required("Price per KG is required")
    .typeError("Price must be a number")
    .positive("Price must be a positive number"),
  departure_city: string().required("Departure city is required"),
  departure_country: string().required("Departure country is required"),
  departure_date: string().required("Departure date is required"),
  arrival_city: string().required("Arrival city is required"),
  arrival_country: string().required("Arrival country is required"),
  arrival_date: string()
    .required("Arrival date is required")
    .test(
      "is-valid-arrival",
      "Arrival date should not be before departure data",
      function (value: string) {
        if (this.parent.departure_date) {
          return (
            dayjs(this.parent.departure_date).isSame(dayjs(value), "date") ||
            dayjs(this.parent.departure_date).isBefore(dayjs(value), "date")
          );
        }
      },
    ),
  phone: string()
    .required("Phone is required")
    .test("is-valid-phone", "Phone number is not valid", function (value) {
      if (!value) {
        return true;
      }

      return isValidPhoneNumber(value);
    }),
  delivery_note: string().nullable().notRequired(),
});
