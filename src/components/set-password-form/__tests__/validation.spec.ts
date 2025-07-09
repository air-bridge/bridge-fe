import { describe, it, expect } from "vitest";
import { validationSchema } from "../validation";

describe("Forgot Password Form Validation", () => {
  const schema = validationSchema();
  const validFormValues = {
    password: "Password@1",
    confirmPassword: "Password@1",
  };

  it("should validate a correct form", async () => {
    await expect(schema.validate(validFormValues)).resolves.toBe(
      validFormValues,
    );
  });

  it("should return error when password is missing", async () => {
    const invalidFormValues = {
      password: "",
      confirmPassword: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Password is required",
    );
  });

  it("should return error when confirm password is missing", async () => {
    const invalidFormValues = {
      password: "",
      confirmPassword: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Confirm Password is required",
    );
  });

  it("should return error when confirm password does not match password", async () => {
    const invalidFormValues = {
      password: "Password@1",
      confirmPassword: "drowssap",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Password does not match",
    );
  });
});
