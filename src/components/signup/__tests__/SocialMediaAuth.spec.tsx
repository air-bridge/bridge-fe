import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialMediaAuth } from "../SocialMediaAuth.tsx";
import * as useMediaQueryModule from "@mui/material/useMediaQuery";
import { spyOnMediaQuery } from "../../../config/tests/utils.tsx";

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

    expect(googleButton).toHaveClass("MuiButton-sizeLarge");
    expect(appleButton).toHaveClass("MuiButton-sizeLarge");
  });
});

describe("Social Media Auth Signup (mobile)", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQueryModule, "default").mockReturnValue(true);

    render(<SocialMediaAuth />);
  });

  it("should render buttons", () => {
    const googleButton = screen.getByRole("button", {
      name: "Sign up with Google",
    });
    const appleButton = screen.getByRole("button", {
      name: "Sign up with Apple",
    });

    expect(googleButton).toHaveClass("MuiButton-sizeMedium");
    expect(appleButton).toHaveClass("MuiButton-sizeMedium");
  });
});

describe("SocialMediaAuth useMediaQuery callback coverage", () => {
  it("should execute the useMediaQuery callback", () => {
    const mockDown = vi.fn().mockReturnValue(false);
    spyOnMediaQuery(mockDown);

    render(<SocialMediaAuth />);
    expect(mockDown).toHaveBeenCalledWith("lg");
  });
});
