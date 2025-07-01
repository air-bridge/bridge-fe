import { describe, expect, it } from "vitest";
import { shadowEmailString } from "../string.ts";

describe("shadowEmailString", () => {
  it("returns the email with the prefix and domain intact, masking the rest", () => {
    expect(shadowEmailString("example@gmail.com")).toBe("exam***@gmail.com");
  });

  it("handles emails with short prefixes correctly", () => {
    expect(shadowEmailString("ex@domain.com")).toBe("ex***@domain.com");
  });

  it("handles emails with no domain part gracefully", () => {
    expect(shadowEmailString("example@")).toBe("exam***@");
  });

  it("handles emails with no prefix part gracefully", () => {
    expect(shadowEmailString("@domain.com")).toBe("***@domain.com");
  });

  it("handles empty email strings gracefully", () => {
    expect(shadowEmailString("")).toBe("");
  });

  it("handles emails with special characters in the prefix", () => {
    expect(shadowEmailString("exa.mple+test@gmail.com")).toBe(
      "exa.***@gmail.com",
    );
  });
});
