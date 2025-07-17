import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { HomepageTabs } from "../index.tsx";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import { mockUserProfile } from "../../../mocks/user.ts";
import * as api from "../../../api/user.ts";
import { ACCOUNT_TYPE } from "../../../context/registration/constant.ts";

vi.mock("../../../api/user.ts", () => ({
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
}));

describe("HomepageTabs", () => {
  it("renders the tabs with action", async () => {
    render(
      <ComponentTestWrapper>
        <HomepageTabs showAction />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "Overview" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Create Order" }),
      ).toBeInTheDocument();
    });
  });

  it("renders the tabs with no action", async () => {
    render(
      <ComponentTestWrapper>
        <HomepageTabs showAction={false} />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "Overview" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "Create Order" })).toBeNull();
    });
  });

  it("renders the tabs with action for passenger", async () => {
    vi.mocked(api.getProfile).mockResolvedValue({
      ...mockUserProfile,
      role: ACCOUNT_TYPE.Passenger,
      current_role: ACCOUNT_TYPE.Passenger,
    });

    render(
      <ComponentTestWrapper>
        <HomepageTabs showAction />
      </ComponentTestWrapper>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "Overview" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Services" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Create Service" }),
      ).toBeInTheDocument();
    });
  });
});
