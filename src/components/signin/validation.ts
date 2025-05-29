import { object, string } from "yup";

export const validationSchema = () =>
  object({
    email: string()
      .required("Email is required")
      .email("Provide a valid email address"),
    password: string().required("Password is required"),
  });
