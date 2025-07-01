import { object, string, ref } from "yup";

export const validationSchema = () =>
  object({
    email: string()
      .required("Email is required")
      .email("Provide a valid email address"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&^#_~-]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: string()
      .required("Confirm Password is required")
      .oneOf([ref("password")], "Password does not match"),
  });
