import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProfileCard } from "../ProfileCard.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";

describe("Profile Card", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <ProfileCard />
        <button data-testid="outside-element">Outside</button>
      </ComponentTestWrapper>,
    );
  });

  it("should render component", () => {
    expect(screen.getByAltText("profile")).toBeInTheDocument();
    expect(screen.getByText("Robert Allen")).toBeInTheDocument();
    expect(screen.getByText("Hey Robert")).toBeInTheDocument();
  });

  it("show menu items", () => {
    expect(screen.getByTestId("menu-container")).toHaveStyle("height: 0");

    fireEvent.click(screen.getByTestId("ExpandMoreIcon"));
    expect(screen.getByTestId("menu-container")).toHaveStyle("height: auto");
    expect(
      screen.getByRole("link", { name: "Profile Information" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Privacy Policy" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log out" })).toBeInTheDocument();
  });

  it("hides menu items on outside click", () => {
    fireEvent.click(screen.getByTestId("ExpandMoreIcon"));
    expect(screen.getByTestId("menu-container")).toHaveStyle("height: auto");

    const menu = screen.getByTestId("menu-container");

    const outsideElement = screen.getByTestId("outside-element");
    fireEvent.mouseDown(outsideElement);

    expect(menu).toHaveStyle("height: 0");
  });
});
