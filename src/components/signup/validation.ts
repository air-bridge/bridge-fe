import { object, string } from "yup";

export const validationSchema = () =>
  object({
    email: string().required("Email is required"),
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
    confirmPassword: string().when("newPassword", {
      is: () => true,
      then: (schema) =>
        schema
          .required("Confirm Password is required")
          .test("passwordsMatch", "Password does not match", function (value) {
            return value === this.parent.newPassword;
          }),
      otherwise: (schema) => schema.required("Confirm Password is required"),
    }),
  });
