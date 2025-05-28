import { object, string } from "yup";

export const validationSchema = () =>
  object({
    firstName: string().required("First name is required"),
    lastName: string().required("Last name is required"),
    phoneNumber: string().required("Phone number is required"),
    country: string().required("Country is required"),
    state: string().required("State is required"),
  });
