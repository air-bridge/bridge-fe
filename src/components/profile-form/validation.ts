import { object, string } from "yup";

export const validationSchema = () =>
  object({
    firstname: string().required("First name is required"),
    lastname: string().required("Last name is required"),
    phone: string().required("Phone number is required"),
    country_code: string().required("Country is required"),
    state: string().required("State is required"),
  });
