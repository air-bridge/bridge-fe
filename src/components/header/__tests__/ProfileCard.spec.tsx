import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../index.tsx";
import { ProfileCard } from "../ProfileCard.tsx";

describe("Profile Card", () => {
  beforeEach(() => {
    render(<ProfileCard />);
  });

  it("should render component", () => {
    expect(screen.getByAltText("profile")).toBeInTheDocument();
    expect(screen.getByText("Robert Allen")).toBeInTheDocument();
    expect(screen.getByText("Hey Robert")).toBeInTheDocument();
  });
});
