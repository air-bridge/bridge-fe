import * as yup from "yup";
import { SetPasswordFormValues } from "../../types/auth.ts";
import { ref, string } from "yup";

export const validationSchema: yup.ObjectSchema<SetPasswordFormValues> =
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
