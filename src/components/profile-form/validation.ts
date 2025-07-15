import { object, ref, string } from "yup";
import * as yup from "yup";
import { SetPasswordFormValues } from "../../types/auth.ts";

export const validationSchema = () =>
  object({
    firstname: string().required("First name is required"),
    lastname: string().required("Last name is required"),
    phone: string().required("Phone number is required"),
    country_code: string().required("Country is required"),
    state: string().required("State is required"),
  });

export const passwordValidationSchema: yup.ObjectSchema<SetPasswordFormValues> =
  yup.object({
    email: yup.string().required("Email is required"),
    new_password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&^#_~-]/,
        "Password must contain at least one special character",
      ),
    confirm_new_password: string()
      .required("Confirm Password is required")
      .oneOf([ref("new_password")], "Password does not match"),
    current_password: yup.string().notRequired().nullable(),
  });

export const updatePasswordValidationSchema: yup.ObjectSchema<SetPasswordFormValues> =
  yup.object({
    email: yup.string().required("Email is required"),
    current_password: yup.string().required("Current Password is required"),
    new_password: string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&^#_~-]/,
        "Password must contain at least one special character",
      ),
    confirm_new_password: string()
      .required("Confirm New Password is required")
      .oneOf([ref("new_password")], "Password does not match"),
  });
