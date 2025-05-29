import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialMediaAuth } from "../SocialMediaAuth.tsx";

describe("Social Media Auth Sign-In", () => {
  beforeEach(() => {
    render(<SocialMediaAuth />);
  });

  it("should render buttons", () => {
    const googleButton = screen.getByRole("button", {
      name: "Sign in with Google",
    });
    const appleButton = screen.getByRole("button", {
      name: "Sign in with Apple",
    });

    expect(googleButton).toBeInTheDocument();
    expect(appleButton).toBeInTheDocument();
  });
});
