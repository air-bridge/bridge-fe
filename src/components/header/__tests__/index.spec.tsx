import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { Header } from "../index.tsx";
import {
  ComponentTestWrapper,
  spyOnMediaQuery,
} from "../../../config/tests/utils.tsx";
import * as useMediaQuery from "@mui/material/useMediaQuery";
import { mockUserProfile } from "../../../mocks/user.ts";
import { ACCOUNT_TYPE } from "../../../context/registration/constant.ts";
import * as api from "../../../api/user.ts";

vi.mock("../../../api/user.ts", () => ({
  setNotifications: vi.fn(() => Promise.resolve({ isSuccess: true })),
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
}));

describe("Screen Header", () => {
  it("should render component", async () => {
    const { getByAltText, getByRole } = render(
      <ComponentTestWrapper>
        <Header />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      expect(getByAltText("logo")).toBeInTheDocument();
      expect(
        getByRole("button", { name: "Switch to Passenger" }),
      ).toBeInTheDocument();
    });
  });

  it("should render component for Sender", async () => {
    vi.mocked(api.getProfile).mockResolvedValue({
      ...mockUserProfile,
      role: ACCOUNT_TYPE.Passenger,
    });

    const { getByAltText, getByRole } = render(
      <ComponentTestWrapper>
        <Header />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      expect(getByAltText("logo")).toBeInTheDocument();
      expect(
        getByRole("button", { name: "Switch to Sender" }),
      ).toBeInTheDocument();
    });
  });
});

describe("Screen Header (mobile)", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
  });

  it("should render component on mobile", () => {
    const { getByTestId, getByAltText, queryByRole } = render(
      <ComponentTestWrapper>
        <Header />
      </ComponentTestWrapper>,
    );

    expect(getByAltText("logo")).toBeInTheDocument();
    expect(getByTestId("SwapHorizIcon")).toBeInTheDocument();
    expect(queryByRole("button", { name: "Switch to Passenger" })).toBeNull();
  });
});

describe("Screen Header useMediaQuery callback coverage", () => {
  it("should execute the useMediaQuery callback", () => {
    const mockDown = vi.fn().mockReturnValue(false);
    spyOnMediaQuery(mockDown);

    render(
      <ComponentTestWrapper>
        <Header />
      </ComponentTestWrapper>,
    );

    expect(mockDown).toHaveBeenCalledWith("lg");
  });
});
