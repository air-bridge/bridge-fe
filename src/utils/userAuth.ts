import Cookies from "js-cookie";
import { UserAuth } from "../types/auth.ts";

export const AUTH_KEY = "airBridgeAuth";

export function getAccessToken(): string | undefined {
  try {
    const cookieValue = Cookies.get(AUTH_KEY);
    if (!cookieValue) return undefined;

    const storedValue = JSON.parse(cookieValue) as UserAuth;

    const { token } = storedValue;
    return token;
  } catch (e) {
    return undefined;
  }
}

export function getAuthUser(): UserAuth | undefined {
  try {
    const cookieValue = Cookies.get(AUTH_KEY);
    if (!cookieValue) return undefined;

    return JSON.parse(cookieValue) as UserAuth;
  } catch (e) {
    return undefined;
  }
}

export function setUserAuth(data: UserAuth): void {
  Cookies.set(AUTH_KEY, JSON.stringify(data), {
    expires: 1,
    path: "/",
    domain: location.hostname,
    secure: true,
  });
}

export function removeAccessToken(): void {
  Cookies.remove(AUTH_KEY, {
    path: "/",
    domain: location.hostname,
  });
}
