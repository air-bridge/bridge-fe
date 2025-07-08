import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { PhotoInput } from "../index";
import { createMockFileList } from "../../../config/tests/utils.tsx";

describe("PhotoInput", () => {
  beforeEach(() => {
    render(<PhotoInput />);
  });

  it("renders upload icon initially", () => {
    const input = screen.getByTestId("photo-input");
    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).type).toBe("file");
    expect(screen.getByTestId("ImageIcon")).toBeInTheDocument();
  });

  it("uploads and displays an image", async () => {
    fireEvent.click(screen.getByTestId("upload-container"));
    const input = screen.getByTestId("photo-input") as HTMLInputElement;
    const mockFile = new File([""], "chucknorris.png", {});
    const mockFileList = createMockFileList([mockFile]);

    Object.defineProperty(input, "files", {
      value: mockFileList,
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(input.files?.length).toBe(1);
      expect(screen.getByRole("img", { name: "photo" })).toBeInTheDocument();
    });
  });

  it("removes the photo when Cancel icon is clicked", async () => {
    const input = screen.getByTestId("photo-input") as HTMLInputElement;
    const mockFile = new File([""], "chucknorris.png", {});
    const mockFileList = createMockFileList([mockFile]);
    Object.defineProperty(input, "files", {
      value: mockFileList,
    });

    fireEvent.change(input);

    await waitFor(() => {
      const cancelBtn = screen.getByTestId("CancelIcon");
      fireEvent.click(cancelBtn);

      expect(
        screen.queryByRole("img", { name: "photo" }),
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("photo-input")).toBeInTheDocument();
    });
  });

  it("ignores empty file input", async () => {
    const input = screen.getByTestId("photo-input") as HTMLInputElement;
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
