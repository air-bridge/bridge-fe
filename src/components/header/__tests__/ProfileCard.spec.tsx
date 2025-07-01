import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProfileCard } from "../ProfileCard.tsx";
import {
  ComponentTestWrapper,
  spyOnMediaQuery,
} from "../../../config/tests/utils.tsx";
import * as userAuth from "../../../utils/userAuth.ts";
import * as useMediaQuery from "@mui/material/useMediaQuery";
import { mockUserAuth } from "../../../mocks/user.ts";

describe("Profile Card", () => {
  beforeEach(() => {
    vi.spyOn(userAuth, "getAuthUser").mockReturnValue(mockUserAuth);

    render(
      <ComponentTestWrapper>
        <ProfileCard />
        <button data-testid="outside-element">Outside</button>
      </ComponentTestWrapper>,
    );
  });

  it("should render component", () => {
    expect(screen.getByAltText("profile")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockUserAuth.firstname} ${mockUserAuth.lastname}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Hey ${mockUserAuth.firstname}`),
    ).toBeInTheDocument();
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

describe("Profile Card - Mobile", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
    vi.spyOn(userAuth, "getAuthUser").mockReturnValue(mockUserAuth);

    render(
      <ComponentTestWrapper>
        <ProfileCard />
        <button data-testid="outside-element">Outside</button>
      </ComponentTestWrapper>,
    );
  });

  it("should render component on mobile", () => {
    expect(screen.getByAltText("profile")).toBeInTheDocument();
    expect(
      screen.queryByText(`${mockUserAuth.firstname} ${mockUserAuth.lastname}`),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(`Hey ${mockUserAuth.firstname}`),
    ).not.toBeInTheDocument();
  });
});

describe("Profile Card useMediaQuery callback coverage", () => {
  it("should execute the useMediaQuery callback", () => {
    const mockDown = vi.fn().mockReturnValue(false);
    spyOnMediaQuery(mockDown);

    render(
      <ComponentTestWrapper>
        <ProfileCard />
      </ComponentTestWrapper>,
    );

    expect(mockDown).toHaveBeenCalledWith("lg");
  });
});
