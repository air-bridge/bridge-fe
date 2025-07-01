import { describe, expect, it, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  ComponentTestWrapper,
  spyOnMediaQuery,
} from "../../../config/tests/utils.tsx";
import * as userAuth from "../../../utils/userAuth.ts";
import { mockUserAuth } from "../../../mocks/user.ts";
import * as useMediaQuery from "@mui/material/useMediaQuery";
import { CreateOrderHeading } from "../CreateOrderHeading.tsx";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
    useLocation: vi.fn(),
  };
});

describe("CreateOrderHeading Component", () => {
  beforeEach(() => {
    vi.spyOn(userAuth, "getAuthUser").mockReturnValue(mockUserAuth);
  });

  it("should render correctly", () => {
    render(
      <ComponentTestWrapper>
        <CreateOrderHeading />
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("Create Order")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Save for later" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Review" }),
    ).toBeInTheDocument();
  });

  it("handles close action correctly", () => {
    render(
      <ComponentTestWrapper>
        <CreateOrderHeading />
      </ComponentTestWrapper>,
    );

    fireEvent.click(screen.getByTestId("close-button"));

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });
});

describe("Order Heading - Mobile", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
  });

  it("should render correctly on mobile", () => {
    render(
      <ComponentTestWrapper>
        <CreateOrderHeading />
      </ComponentTestWrapper>,
    );

    expect(screen.getByText("Create Order")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Save for later" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Review" }),
    ).not.toBeInTheDocument();
  });
});

describe("CreateOrderHeading useMediaQuery callback coverage", () => {
  it("should execute the useMediaQuery callback", () => {
    const mockDown = vi.fn().mockReturnValue(false);
    spyOnMediaQuery(mockDown);

    render(
      <ComponentTestWrapper>
        <CreateOrderHeading />
      </ComponentTestWrapper>,
    );

    expect(mockDown).toHaveBeenCalledWith("lg");
  });
});
