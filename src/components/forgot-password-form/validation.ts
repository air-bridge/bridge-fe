import { object, string } from "yup";

export const validationSchema = () =>
  object({
    email: string().required("Email is required").email("Provide valid email"),
  });
