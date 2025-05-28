import { object, string } from "yup";

export const validationSchema = () =>
  object({
    email: string().required("Email is required"),
    password: string().required("Password is required"),
  });
