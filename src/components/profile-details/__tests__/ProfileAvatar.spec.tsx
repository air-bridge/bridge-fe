import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  ComponentTestWrapper,
  createMockFileList,
  testMediaQueryCallback,
} from "../../../config/tests/utils.tsx";
import { ProfileAvatar } from "../ProfileAvatar.tsx";
import { mockUserAuth } from "../../../mocks/user.ts";
import * as userAuth from "../../../utils/userAuth.ts";
import * as useMediaQuery from "@mui/material/useMediaQuery";

describe("Profile Avatar", () => {
  beforeEach(() => {
    vi.spyOn(userAuth, "getAuthUser").mockReturnValue(mockUserAuth);

    render(
      <ComponentTestWrapper>
        <ProfileAvatar />
      </ComponentTestWrapper>,
    );
  });

  it("renders components", () => {
    expect(screen.getByText("Profile photo")).toBeInTheDocument();
    expect(
      screen.getByText("This image will be displayed on your profile"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Change photo" }),
    ).toBeInTheDocument();
  });

  it("renders fallback text for Avatar", () => {
    expect(screen.getByText("AM")).toBeInTheDocument();
  });

  it("uploads and displays an image", async () => {
    expect(screen.getByText("AM")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Change photo" }));
    const input = screen.getByTestId("avatar-input") as HTMLInputElement;
    const mockFile = new File([""], "chucknorris.png", {});
    const mockFileList = createMockFileList([mockFile]);

    Object.defineProperty(input, "files", {
      value: mockFileList,
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(input.files?.length).toBe(1);
      expect(screen.queryByText("AM")).not.toBeInTheDocument();
    });
  });

  it("should select image and can change image", async () => {
    fireEvent.click(screen.getByRole("button", { name: "Change photo" }));
    const input = screen.getByTestId("avatar-input") as HTMLInputElement;
    const mockFile = new File([""], "chucknorris.png", {});
    const mockFileList = createMockFileList([mockFile]);

    Object.defineProperty(input, "files", {
      value: mockFileList,
      configurable: true,
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(input.files?.length).toBe(1);
    });

    const mockFile2 = new File([""], "chucknorris2.png", {});
    Object.defineProperty(input, "files", {
      value: createMockFileList([mockFile2]),
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(input.files?.length).toBe(1);
    });
  });

  it("ignores empty file input", async () => {
    const input = screen.getByTestId("avatar-input") as HTMLInputElement;
    const mockFileList = createMockFileList([]);

    Object.defineProperty(input, "files", {
      value: mockFileList,
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(input.files?.length).toBe(0);
      expect(
        screen.queryByRole("img", { name: "photo" }),
      ).not.toBeInTheDocument();
    });
  });
});

describe("Profile Avatar Mobile", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
    render(
      <ComponentTestWrapper>
        <ProfileAvatar />
      </ComponentTestWrapper>,
    );
  });

  it("renders empty component in mobile", () => {
    expect(screen.getByTestId("mobile-button")).toBeInTheDocument();
    expect(screen.queryByTestId("lg-button")).not.toBeInTheDocument();
  });
});

// INFO: Needed coverage for media breakpoints
testMediaQueryCallback(<ProfileAvatar />);
