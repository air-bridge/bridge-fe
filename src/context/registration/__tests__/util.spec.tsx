import { describe, it, expect } from "vitest";
import { initialPayload, useRegistrationContext } from "../util.ts";
import { renderHook, act } from "@testing-library/react";
import { RegistrationContextProvider } from "../index.tsx";
import { PropsWithChildren } from "react";

const wrapper = ({ children }: PropsWithChildren) => (
  <RegistrationContextProvider>{children}</RegistrationContextProvider>
);

describe("useRegistrationContext", () => {
  it("should set the initial state", () => {
    const {
      result: {
        current: { payload },
      },
    } = renderHook(useRegistrationContext);

    expect(payload).toStrictEqual(initialPayload);
  });

  it("should update context state", () => {
    const { result } = renderHook(useRegistrationContext, { wrapper });
    expect(result.current.payload.firstName).toBe("");
    expect(result.current.payload.lastName).toBe("");

    act(() => {
      result.current.setRegistrationInfo({
        firstName: "Test",
        lastName: "Last",
      });
    });

    expect(result.current.payload.firstName).toBe("Test");
    expect(result.current.payload.lastName).toBe("Last");
  });
});
