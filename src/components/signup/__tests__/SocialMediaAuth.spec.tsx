import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialMediaAuth } from "../SocialMediaAuth.tsx";

describe("Social Media Auth Signup", () => {
  beforeEach(() => {
    render(<SocialMediaAuth />);
  });

  it("should render buttons", () => {
    const googleButton = screen.getByRole("button", {
      name: "Sign up with Google",
    });
    const appleButton = screen.getByRole("button", {
      name: "Sign up with Apple",
    });

    expect(googleButton).toBeInTheDocument();
    expect(appleButton).toBeInTheDocument();
  });
});
