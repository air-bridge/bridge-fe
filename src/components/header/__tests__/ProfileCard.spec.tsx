import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProfileCard } from "../ProfileCard.tsx";
import {
  ComponentTestWrapper,
  spyOnMediaQuery,
} from "../../../config/tests/utils.tsx";
import * as useMediaQuery from "@mui/material/useMediaQuery";
import { mockUserProfile } from "../../../mocks/user.ts";

vi.mock("../../../api/user.ts", () => ({
  setNotifications: vi.fn(() => Promise.resolve({ isSuccess: true })),
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
}));

describe("Profile Card", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <ProfileCard />
        <button data-testid="outside-element">Outside</button>
      </ComponentTestWrapper>,
    );
  });

  it("should render component", async () => {
    await waitFor(() => {
      expect(screen.getByAltText("profile")).toBeInTheDocument();
      expect(
        screen.getByText(
          `${mockUserProfile.firstname} ${mockUserProfile.lastname}`,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Hey ${mockUserProfile.firstname}`),
      ).toBeInTheDocument();
    });
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
      screen.queryByText(
        `${mockUserProfile.firstname} ${mockUserProfile.lastname}`,
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(`Hey ${mockUserProfile.firstname}`),
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
