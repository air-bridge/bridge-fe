import { object, ref, string } from "yup";

export const validationSchema = () =>
  object({
    firstname: string().required("First name is required"),
    lastname: string().required("Last name is required"),
    phone: string().required("Phone number is required"),
    country_code: string().required("Country is required"),
    state: string().required("State is required"),
  });

export const passwordValidationSchema = () =>
  object({
    currentPassword: string().required("Current password is required"),
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
