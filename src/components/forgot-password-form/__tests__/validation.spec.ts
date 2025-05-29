import { describe, it, expect } from "vitest";
import { validationSchema } from "../validation";

describe("Forgot Password Form Validation", () => {
  const schema = validationSchema();
  const validFormValues = {
    email: "test@mail.com",
  };

  it("should validate a correct form", async () => {
    await expect(schema.validate(validFormValues)).resolves.toBe(
      validFormValues,
    );
  });

  it("should return error when email is missing", async () => {
    const invalidFormValues = {
      email: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Email is required",
    );
  });

  it("should return error when email is invalid", async () => {
    const invalidFormValues = {
      email: "invalid-email",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Provide valid email",
    );
  });
});
