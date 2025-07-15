import { describe, it, expect } from "vitest";
import {
  passwordValidationSchema,
  updatePasswordValidationSchema,
  validationSchema,
} from "../validation";

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

describe("Set Password Validation Schema", () => {
  const schema = passwordValidationSchema;
  const validFormValues = {
    email: "test@mail.com",
    new_password: "Password@1",
    confirm_new_password: "Password@1",
  };

  it("should validate a correct form", async () => {
    await expect(schema.validate(validFormValues)).resolves.toBe(
      validFormValues,
    );
  });

  it("should return error when password is missing", async () => {
    const invalidFormValues = {
      new_password: "",
      confirm_new_password: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Password is required",
    );
  });

  it("should return error when confirm password is missing", async () => {
    const invalidFormValues = {
      new_password: "",
      confirm_new_password: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Confirm Password is required",
    );
  });

  it("should return error when confirm password does not match password", async () => {
    const invalidFormValues = {
      new_password: "Password@1",
      confirm_new_password: "drowssap",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Password does not match",
    );
  });
});

describe("Update Password Validation Schema", () => {
  const schema = updatePasswordValidationSchema;
  const validFormValues = {
    email: "test@mail.com",
    current_password: "Password@31",
    new_password: "Password@1",
    confirm_new_password: "Password@1",
  };

  it("should validate a correct form", async () => {
    await expect(schema.validate(validFormValues)).resolves.toBe(
      validFormValues,
    );
  });

  it("should return error when current password is missing", async () => {
    const invalidFormValues = {
      current_password: "",
      new_password: "Password@1",
      confirm_new_password: "Password@1",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Current Password is required",
    );
  });

  it("should return error when password is missing", async () => {
    const invalidFormValues = {
      current_password: "Password@1",
      new_password: "",
      confirm_new_password: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "New Password is required",
    );
  });

  it("should return error when confirm password is missing", async () => {
    const invalidFormValues = {
      new_password: "",
      confirm_new_password: "",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Confirm New Password is required",
    );
  });

  it("should return error when confirm password does not match password", async () => {
    const invalidFormValues = {
      new_password: "Password@1",
      confirm_new_password: "drowssap",
    };

    await expect(schema.validate(invalidFormValues)).rejects.toThrow(
      "Password does not match",
    );
  });
});
