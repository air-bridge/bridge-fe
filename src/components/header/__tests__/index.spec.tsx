import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { Header } from "../index.tsx";
import {
  ComponentTestWrapper,
  spyOnMediaQuery,
} from "../../../config/tests/utils.tsx";
import * as useMediaQuery from "@mui/material/useMediaQuery";
import { mockPassengerProfile, mockUserProfile } from "../../../mocks/user.ts";
import * as api from "../../../api/user.ts";
import * as authApi from "../../../api/auth.ts";

vi.mock("../../../api/user.ts", () => ({
  setNotifications: vi.fn(() => Promise.resolve({ isSuccess: true })),
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
}));

vi.mock("../../../api/auth.ts", () => ({
  switchRole: vi.fn(() => Promise.resolve({ isSuccess: true })),
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

  it("switch role", async () => {
    vi.mocked(api.getProfile).mockResolvedValue(mockUserProfile);

    render(
      <ComponentTestWrapper>
        <Header />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Switch to Passenger" }),
      );

      // mock refetch response
      vi.mocked(api.getProfile).mockResolvedValue(mockPassengerProfile);
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Switch to Sender" }));
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(
        screen.getByText("Role switched successfully."),
      ).toBeInTheDocument();
    });
  });

  it("handles switch role API error", async () => {
    vi.mocked(api.getProfile).mockResolvedValue(mockUserProfile);
    vi.mocked(authApi.switchRole).mockRejectedValue(
      new Error("Fail to switch role"),
    );

    render(
      <ComponentTestWrapper>
        <Header />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Switch to Passenger" }),
      );
    });

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Fail to switch role")).toBeInTheDocument();
    });
  });

  it("should render component for Sender", async () => {
    vi.mocked(api.getProfile).mockResolvedValue(mockPassengerProfile);

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
