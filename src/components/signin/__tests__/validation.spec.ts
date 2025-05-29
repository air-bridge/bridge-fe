import { describe, it, expect } from "vitest";
import { validationSchema } from "../validation";

describe("Sign-in Form Validation", () => {
  const schema = validationSchema();
  const validSignInFormValues = {
    email: "test@mail.com",
    password: "password",
  };

  it("should validate a correct form", async () => {
    await expect(schema.validate(validSignInFormValues)).resolves.toBe(
      validSignInFormValues,
    );
  });

  it("should return error when email is missing", async () => {
    const invalidFormValues = {
      password: "password",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Email is required",
    );
  });

  it("should return error when email is invalid", async () => {
    const invalidFormValues = {
      email: "invalid-email",
      password: "password",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Provide a valid email address",
    );
  });

  it("should return error when password is missing", async () => {
    const invalidFormValues = {
      email: "test@mail.com",
      password: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Password is required",
    );
  });
});
