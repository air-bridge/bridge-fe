import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  ComponentTestWrapper,
  testMediaQueryCallback,
} from "../../../config/tests/utils.tsx";
import { mockUserProfile } from "../../../mocks/user.ts";
import * as api from "../../../api/user.ts";
import { PersonalDetails } from "../PersonalDetails.tsx";
import * as useMediaQuery from "@mui/material/useMediaQuery";

vi.mock("../../../api/user.ts", () => ({
  getProfile: vi.fn(() => Promise.resolve(mockUserProfile)),
  updateUser: vi.fn(() => Promise.resolve({ isSuccess: true })),
}));

describe("Personal Details", () => {
  beforeEach(() => {
    render(
      <ComponentTestWrapper>
        <PersonalDetails data={mockUserProfile} />
      </ComponentTestWrapper>,
    );
  });

  it("renders components", () => {
    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(
      screen.getByText(
        "These are your personal details, they are visible to the public",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Email")).toBeDisabled();
  });

  it("should populate fields with initial values", () => {
    expect(screen.getByPlaceholderText("First Name")).toHaveValue(
      mockUserProfile.firstname,
    );
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue(
      mockUserProfile.lastname,
    );
    expect(screen.getByPlaceholderText("Phone Number")).toHaveValue(
      mockUserProfile.phone,
    );
    expect(screen.getByPlaceholderText("Select country")).toHaveValue(
      mockUserProfile.country_code,
    );
    expect(screen.getByPlaceholderText("State of Residence")).toHaveValue(
      mockUserProfile.state,
    );
  });

  it("should update input fields correctly", () => {
    const firstNameInput = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameInput, {
      target: { value: "Alex" },
    });
    fireEvent.blur(firstNameInput);

    const lastnameInput = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastnameInput, {
      target: { value: "Max" },
    });
    fireEvent.blur(lastnameInput);

    const phoneInput = screen.getByPlaceholderText("Phone Number");
    fireEvent.change(phoneInput, {
      target: { value: "1234567890" },
    });
    fireEvent.blur(phoneInput);

    const countrySelect = screen.getByPlaceholderText("Select country");
    fireEvent.change(countrySelect, {
      target: { value: "Nigeria" },
    });
    fireEvent.keyDown(countrySelect, { key: "ArrowDown" });
    fireEvent.keyDown(countrySelect, { key: "Enter" });

    const stateSelect = screen.getByRole("combobox", {
      name: "State of Residence",
    });
    fireEvent.mouseDown(stateSelect);
    const stateOption = screen.getByRole("option", { name: "Abuja" });
    fireEvent.click(stateOption);
    fireEvent.blur(stateSelect);

    expect(screen.getByPlaceholderText("First Name")).toHaveValue("Alex");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("Max");
    expect(screen.getByPlaceholderText("Phone Number")).toHaveValue(
      "1234567890",
    );
    expect(screen.getByPlaceholderText("Select country")).toHaveValue(
      "Nigeria",
    );
    expect(screen.getByPlaceholderText("State of Residence")).toHaveValue(
      "Abuja",
    );
  });

  it("should submit form", async () => {
    const firstNameInput = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameInput, {
      target: { value: "Alex" },
    });
    fireEvent.blur(firstNameInput);

    const lastnameInput = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastnameInput, {
      target: { value: "Max" },
    });
    fireEvent.blur(lastnameInput);

    const phoneInput = screen.getByPlaceholderText("Phone Number");
    fireEvent.change(phoneInput, {
      target: { value: "1234567890" },
    });
    fireEvent.blur(phoneInput);

    const countrySelect = screen.getByPlaceholderText("Select country");
    fireEvent.change(countrySelect, {
      target: { value: "Nigeria" },
    });
    fireEvent.keyDown(countrySelect, { key: "ArrowDown" });
    fireEvent.keyDown(countrySelect, { key: "Enter" });

    const stateSelect = screen.getByRole("combobox", {
      name: "State of Residence",
    });
    fireEvent.mouseDown(stateSelect);
    const stateOption = screen.getByRole("option", { name: "Abuja" });
    fireEvent.click(stateOption);
    fireEvent.blur(stateSelect);

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => {
      // TODO: mockOnSubmit after action
    });
  });

  it("should show error when API fail", async () => {
    vi.mocked(api.updateUser).mockRejectedValue(
      new Error("Unable to save changes!"),
    );

    const firstNameInput = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameInput, {
      target: { value: "Alex" },
    });
    fireEvent.blur(firstNameInput);

    const lastnameInput = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastnameInput, {
      target: { value: "Max" },
    });
    fireEvent.blur(lastnameInput);

    const phoneInput = screen.getByPlaceholderText("Phone Number");
    fireEvent.change(phoneInput, {
      target: { value: "1234567890" },
    });
    fireEvent.blur(phoneInput);

    const countrySelect = screen.getByPlaceholderText("Select country");
    fireEvent.change(countrySelect, {
      target: { value: "Nigeria" },
    });
    fireEvent.keyDown(countrySelect, { key: "ArrowDown" });
    fireEvent.keyDown(countrySelect, { key: "Enter" });

    const stateSelect = screen.getByRole("combobox", {
      name: "State of Residence",
    });
    fireEvent.mouseDown(stateSelect);
    const stateOption = screen.getByRole("option", { name: "Abuja" });
    fireEvent.click(stateOption);
    fireEvent.blur(stateSelect);

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => {
      expect(screen.getByText("Unable to save changes!")).toBeInTheDocument();
    });
  });

  it("should handle country deselect", () => {
    const countrySelect = screen.getByPlaceholderText("Select country");
    fireEvent.change(countrySelect, {
      target: { value: "Nigeria" },
    });
    fireEvent.keyDown(countrySelect, { key: "ArrowDown" });
    fireEvent.keyDown(countrySelect, { key: "Enter" });

    expect(screen.getByPlaceholderText("Select country")).toHaveValue(
      "Nigeria",
    );

    fireEvent.change(countrySelect, {
      target: { value: "" },
    });
    fireEvent.keyDown(countrySelect, { key: "Backspace" });
    fireEvent.blur(countrySelect);

    expect(screen.getByPlaceholderText("Select country")).toHaveValue("");
  });

  it("should update country with empty isoField", () => {
    const countrySelect = screen.getByPlaceholderText("Select country");
    fireEvent.keyDown(countrySelect, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Indonesia"));

    expect(screen.getByPlaceholderText("Select country")).toHaveValue(
      "Indonesia",
    );
    expect(screen.getByPlaceholderText("State of Residence")).toHaveValue("");
  });

  it("should show validation errors", async () => {
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Select country"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Select country"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("State of Residence"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => {
      expect(screen.queryByText("First name is required")).toBeInTheDocument();
      expect(screen.queryByText("Last name is required")).toBeInTheDocument();
      expect(screen.getByText("Phone number is required")).toBeInTheDocument();
      expect(screen.getByText("Country is required")).toBeInTheDocument();
      expect(screen.getByText("State is required")).toBeInTheDocument();
    });
  });
});

describe("Personal Details Mobile", () => {
  beforeEach(() => {
    vi.spyOn(useMediaQuery, "default").mockReturnValue(true);
    render(
      <ComponentTestWrapper>
        <PersonalDetails data={mockUserProfile} />
      </ComponentTestWrapper>,
    );
  });

  it("renders empty component in mobile", () => {
    expect(screen.getByTestId("mobile-button")).toBeInTheDocument();
    expect(screen.queryByTestId("lg-button")).not.toBeInTheDocument();
  });
});

// INFO: Needed coverage for media breakpoints
testMediaQueryCallback(<PersonalDetails data={mockUserProfile} />);
