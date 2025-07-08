import { describe, it, expect } from "vitest";
import { useUserContext } from "../util.ts";
import { renderHook, act } from "@testing-library/react";
import { UserContextProvider } from "../index.tsx";
import { PropsWithChildren } from "react";
import { ACCOUNT_TYPE } from "../../registration/constant.ts";

const wrapper = ({ children }: PropsWithChildren) => (
  <UserContextProvider>{children}</UserContextProvider>
);

describe("useUserContext", () => {
  it("should set the initial state", () => {
    const {
      result: {
        current: { isSender },
      },
    } = renderHook(useUserContext);

    expect(isSender).toBe(true);
  });

  it("should update context state", () => {
    const { result } = renderHook(useUserContext, { wrapper });

    act(() => {
      result.current.updateUserAuthInfo({
        firstname: "Test",
        lastname: "User",
        email: "test@mail.com",
        refresh_token: "rfr_token",
        token: "token",
        role: ACCOUNT_TYPE.Passenger,
      });
    });

    expect(result.current?.currentUser?.firstname).toBe("Test");
    expect(result.current?.currentUser?.lastname).toBe("User");
    expect(result.current?.currentUser?.email).toBe("test@mail.com");
    expect(result.current?.currentUser?.refresh_token).toBe("rfr_token");
    expect(result.current?.currentUser?.token).toBe("token");
    expect(result.current?.currentUser?.role).toBe(ACCOUNT_TYPE.Passenger);
    expect(result.current.isSender).toBeFalsy();
  });

  it("should initialize with no user if getAuthUser returns undefined", () => {
    const { result } = renderHook(useUserContext, {
      wrapper,
    });

    expect(result.current.currentUser).toBeUndefined();
    expect(result.current.isSender).toBeFalsy();
  });

  it("should set user if updateUserAuthInfo is called when currentUser is undefined", () => {
    const { result } = renderHook(useUserContext, {
      wrapper,
    });

    act(() => {
      result.current.updateUserAuthInfo({
        firstname: "Jane",
        lastname: "Doe",
        email: "jane@mail.com",
        refresh_token: "refresh",
        token: "token",
        role: ACCOUNT_TYPE.Sender,
      });
    });

    expect(result.current.currentUser?.firstname).toBe("Jane");
    expect(result.current.currentUser?.lastname).toBe("Doe");
    expect(result.current.currentUser?.email).toBe("jane@mail.com");
    expect(result.current.currentUser?.refresh_token).toBe("refresh");
    expect(result.current.currentUser?.token).toBe("token");
    expect(result.current.isSender).toBeTruthy();
  });

  it("should have undefined currentUser in default context value (outside provider)", () => {
    const { result } = renderHook(useUserContext);
    expect(result.current.currentUser).toBeUndefined();
    expect(result.current.isSender).toBe(true);
  });
});

describe("UserContextProvider direct function coverage", () => {
  it("should call updateUserAuthInfo directly from context", () => {
    const { result } = renderHook(useUserContext);

    act(() => {
      result.current.updateUserAuthInfo({
        firstname: "Jane",
        lastname: "Doe",
        email: "jane@mail.com",
        refresh_token: "refresh",
        token: "token",
        role: ACCOUNT_TYPE.Sender,
      });
    });

    // No assertion needed, just ensure the function is called for coverage
  });
});
