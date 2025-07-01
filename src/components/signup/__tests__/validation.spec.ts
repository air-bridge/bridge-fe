import { describe, it, expect } from "vitest";
import { validationSchema } from "../validation";

describe("Signup Form Validation", () => {
  const schema = validationSchema();
  const validSignInFormValues = {
    email: "test@mail.com",
    password: "Password@1",
    confirmPassword: "Password@1",
  };

  it("should validate a correct form", async () => {
    await expect(schema.validate(validSignInFormValues)).resolves.toBe(
      validSignInFormValues,
    );
  });

  it("should return error when email is missing", async () => {
    const invalidFormValues = {
      password: "Password@1",
      confirmPassword: "Password@1",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Email is required",
    );
  });

  it("should return error when email is invalid", async () => {
    const invalidFormValues = {
      email: "invalid-email",
      password: "Password@1",
      confirmPassword: "Password@1",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Provide a valid email address",
    );
  });

  it("should return error when password is missing", async () => {
    const invalidFormValues = {
      email: "test@mail.com",
      password: "",
      confirmPassword: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Password is required",
    );
  });

  it("should return error when confirm password is missing", async () => {
    const invalidFormValues = {
      email: "test@mail.com",
      password: "",
      confirmPassword: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Confirm Password is required",
    );
  });

  it("should return error when confirm password does not match password", async () => {
    const invalidFormValues = {
      email: "test@mail.com",
      password: "Password@1",
      confirmPassword: "drowssap",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Password does not match",
    );
  });
});
