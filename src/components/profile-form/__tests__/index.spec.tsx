import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProfileForm } from "../index.tsx";
import {
  initialPayload,
  RegistrationContext,
} from "../../../context/registration/util.ts";
import { RegistrationPayload } from "../../../types/user.ts";
import { ACCOUNT_TYPE } from "../../../context/registration/constant.ts";
import { ComponentTestWrapper } from "../../../config/tests/utils.tsx";
import { mockUserAuth } from "../../../mocks/user.ts";
import * as api from "../../../api/auth.ts";

vi.mock("../../../api/auth.ts", () => ({
  register: vi.fn(() => Promise.resolve({ data: mockUserAuth })),
}));

describe("Profile form component", () => {
  const mockOnNext = vi.fn();
  const mockSetRegistrationInfo = vi.fn();

  const renderComponent = (payload: RegistrationPayload) => {
    render(
      <ComponentTestWrapper>
        <RegistrationContext.Provider
          value={{
            payload,
            setRegistrationInfo: mockSetRegistrationInfo,
          }}
        >
          <ProfileForm onNext={mockOnNext} />
        </RegistrationContext.Provider>
      </ComponentTestWrapper>,
    );
  };

  it("should update input fields correctly", () => {
    renderComponent(initialPayload);

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

  it("should populate fields from initial state", () => {
    renderComponent({
      email: "test@mail.com",
      password: "Password@1",
      confirmPassword: "Password@1",
      firstname: "Test",
      lastname: "User",
      phone: "01293893894",
      country_code: "Nigeria",
      state: "",
      role: ACCOUNT_TYPE.Sender,
    });

    expect(screen.getByPlaceholderText("First Name")).toHaveValue("Test");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("User");
    expect(screen.getByPlaceholderText("Phone Number")).toHaveValue(
      "01293893894",
    );
    expect(screen.getByPlaceholderText("Select country")).toHaveValue(
      "Nigeria",
    );
    expect(screen.getByPlaceholderText("State of Residence")).toHaveValue("");
  });

  it("should handle country deselect", () => {
    renderComponent({
      email: "test@mail.com",
      password: "Password@1",
      confirmPassword: "Password@1",
      firstname: "Test",
      lastname: "User",
      phone: "",
      country_code: "Nigeria",
      state: "",
      role: ACCOUNT_TYPE.Sender,
    });

    expect(screen.getByPlaceholderText("Select country")).toHaveValue(
      "Nigeria",
    );

    const countrySelect = screen.getByPlaceholderText("Select country");
    fireEvent.change(countrySelect, {
      target: { value: "" },
    });
    fireEvent.keyDown(countrySelect, { key: "Backspace" });
    fireEvent.blur(countrySelect);

    expect(screen.getByPlaceholderText("Select country")).toHaveValue("");
    expect(screen.getByPlaceholderText("State of Residence")).toHaveValue("");
  });

  it("should update country with empty isoField", () => {
    renderComponent(initialPayload);

    const countrySelect = screen.getByPlaceholderText("Select country");
    fireEvent.keyDown(countrySelect, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Indonesia"));

    expect(screen.getByPlaceholderText("Select country")).toHaveValue(
      "Indonesia",
    );
    expect(screen.getByPlaceholderText("State of Residence")).toHaveValue("");
  });

  it("should submit form", async () => {
    renderComponent(initialPayload);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Max" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });

    const countrySelect = screen.getByPlaceholderText("Select country");
    fireEvent.change(countrySelect, {
      target: { value: "Nigeria" },
    });
    fireEvent.keyDown(countrySelect, { key: "ArrowDown" });
    fireEvent.keyDown(countrySelect, { key: "Enter" });

    const stateSelect = screen.getByRole("combobox", {
      name: "State of Residence",
    });
    expect(stateSelect).toBeInTheDocument();
    fireEvent.mouseDown(stateSelect);
    const stateOption = screen.getByRole("option", { name: "Lagos" });
    fireEvent.click(stateOption);

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledOnce();
    });
  });

  it("should error for failed API request form", async () => {
    vi.mocked(api.register).mockRejectedValue(
      new Error("Registration failed, please try again!"),
    );

    renderComponent({
      email: "test@mail.com",
      firstname: "Alex",
      lastname: "Alex",
      role: ACCOUNT_TYPE.Sender,
      password: "Pas@1093093mdk",
      confirmPassword: "Pas@1093093mdk",
      phone: "1234455",
      country_code: "Germany",
      state: "Berlin",
    });

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(
        screen.getByText("Registration failed, please try again!"),
      ).toBeInTheDocument();
    });
  });
});
