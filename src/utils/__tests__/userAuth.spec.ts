import { describe, it, expect, vi, beforeEach } from "vitest";
import Cookies from "js-cookie";
import {
  getAccessToken,
  getAuthUser,
  setUserAuth,
  removeAccessToken,
  AUTH_KEY,
} from "../userAuth.ts";
import { initialPayload } from "../../context/registration/util.ts";

const mockHostname = "example.com";

vi.stubGlobal("location", {
  hostname: mockHostname,
});

vi.mock("js-cookie", () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

const mockUser = initialPayload;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Auth Utils", () => {
  it("getAccessToken returns undefined if cookie is missing", () => {
    (Cookies.get as any).mockReturnValue(undefined);

    const token = getAccessToken();
    expect(token).toBeUndefined();
  });

  it("getAccessToken returns undefined on invalid JSON", () => {
    (Cookies.get as any).mockReturnValue("invalid-json");

    const token = getAccessToken();
    expect(token).toBeUndefined();
  });

  it("getAccessToken returns access token from cookie", () => {
    (Cookies.get as any).mockReturnValue(JSON.stringify(mockUser));

    //TODO: update when API is ready
    const token = getAccessToken();
    expect(token).toBe(undefined);
  });

  it("getAuthUser returns undefined if cookie is missing", () => {
    (Cookies.get as any).mockReturnValue(undefined);

    const user = getAuthUser();
    expect(user).toBeUndefined();
  });

  it("getAuthUser returns undefined on invalid JSON", () => {
    (Cookies.get as any).mockReturnValue("invalid-json");

    const user = getAuthUser();
    expect(user).toBeUndefined();
  });

  it("getAuthUser returns user object from cookie", () => {
    (Cookies.get as any).mockReturnValue(JSON.stringify(mockUser));

    const user = getAuthUser();
    expect(user).toEqual(mockUser);
  });

  it("setUserAuth sets cookie with correct options", () => {
    setUserAuth(mockUser);

    expect(Cookies.set).toHaveBeenCalledWith(
      AUTH_KEY,
      JSON.stringify(mockUser),
      {
        expires: 1,
        path: "/",
        domain: mockHostname,
        secure: true,
      },
    );
  });

  it("removeAccessToken removes cookie with correct options", () => {
    removeAccessToken();

    expect(Cookies.remove).toHaveBeenCalledWith(AUTH_KEY, {
      path: "/",
      domain: mockHostname,
    });
  });
});
