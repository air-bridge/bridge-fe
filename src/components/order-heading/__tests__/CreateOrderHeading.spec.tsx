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
  const mockOnSetShowReview = vi.fn();
  const mockOnBack = vi.fn();

  it("should render correctly", () => {
    render(
      <ComponentTestWrapper>
        <CreateOrderHeading
          showReview
          onSetShowReview={mockOnSetShowReview}
          onBack={mockOnBack}
        />
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
        <CreateOrderHeading
          showReview
          onSetShowReview={mockOnSetShowReview}
          onBack={mockOnBack}
        />
      </ComponentTestWrapper>,
    );

    fireEvent.click(screen.getByTestId("close-button"));

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });
});

describe("Order Heading - Mobile", () => {
  const mockOnSetShowReview = vi.fn();
  const mockOnBack = vi.fn();

  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
  });

  it("should render correctly on mobile", () => {
    render(
      <ComponentTestWrapper>
        <CreateOrderHeading
          showReview
          onSetShowReview={mockOnSetShowReview}
          onBack={mockOnBack}
        />
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
  const mockOnSetShowReview = vi.fn();
  const mockOnBack = vi.fn();

  it("should execute the useMediaQuery callback", () => {
    const mockDown = vi.fn().mockReturnValue(false);
    spyOnMediaQuery(mockDown);

    render(
      <ComponentTestWrapper>
        <CreateOrderHeading
          showReview
          onSetShowReview={mockOnSetShowReview}
          onBack={mockOnBack}
        />
      </ComponentTestWrapper>,
    );

    expect(mockDown).toHaveBeenCalledWith("lg");
  });
});
