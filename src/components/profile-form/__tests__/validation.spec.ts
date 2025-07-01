import { describe, it, expect } from "vitest";
import { validationSchema } from "../validation";

describe("Profile Form Validation", () => {
  const schema = validationSchema();
  const validProfile = {
    firstname: "Max",
    lastname: "Alex",
    phone: "12345678",
    country_code: "Germany",
    state: "Lagos",
  };

  it("should validate a correct form", async () => {
    await expect(schema.validate(validProfile)).resolves.toBe(validProfile);
  });

  it("should return error when first name is missing", async () => {
    const invalidFormValues = {
      firstname: "",
      lastname: "Alex",
      phone: "12345678",
      country_code: "Germany",
      state: "Berlin",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "First name is required",
    );
  });

  it("should return error when last name is missing", async () => {
    const invalidFormValues = {
      firstname: "Max",
      lastname: "",
      phone: "12345678",
      country_code: "Germany",
      state: "Berlin",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Last name is required",
    );
  });

  it("should return error when phone number is missing", async () => {
    const invalidFormValues = {
      firstname: "Max",
      lastname: "Alex",
      phone: "",
      country_code: "Germany",
      state: "Berlin",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Phone number is required",
    );
  });

  it("should return error when country is missing", async () => {
    const invalidFormValues = {
      firstname: "Max",
      lastname: "Alex",
      phone: "12345678",
      country_code: "",
      state: "Berlin",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Country is required",
    );
  });

  it("should return error when state is missing", async () => {
    const invalidFormValues = {
      firstname: "Max",
      lastname: "Alex",
      phone: "12345678",
      country_code: "Germany",
      state: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "State is required",
    );
  });
});
