import {
  AUTH_KEY,
  getAccessToken,
  removeAccessToken,
  setUserAuth,
} from "../utils/userAuth.ts";
import Cookies from "js-cookie";
import { APIResponse, UserAuth } from "../types/auth.ts";
import { ErrorCodes } from "../components/signin/constant.ts";

const handleLogout = () => {
  removeAccessToken();
  window.location.reload();
};

let refreshTokenPromise: Promise<string | undefined> | null = null;

const getRefreshToken = async (): Promise<string | undefined> => {
  if (refreshTokenPromise) {
    return refreshTokenPromise;
  }

  refreshTokenPromise = (async () => {
    try {
      const cookieValue = Cookies.get(AUTH_KEY);
      if (!cookieValue) {
        return;
      }

      const storedValue = JSON.parse(cookieValue) as UserAuth;
      const refreshToken = storedValue.refresh_token;
      const userId = storedValue.user_id;

      const res = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/users/refresh`,
        {
          method: "POST",
          body: JSON.stringify({
            refresh_token: refreshToken,
            user_id: userId,
          }),
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!res.ok) {
        return;
      }

      const response = (await res.json()) as {
        data: {
          token: string;
          refresh_token: string;
        };
      };
      const { token, refresh_token } = response.data;

      setUserAuth({ ...storedValue, token, refresh_token });

      return token;
    } catch {
      return;
    } finally {
      refreshTokenPromise = null; // clear after complete
    }
  })();

  return refreshTokenPromise;
};

const fetchWithRetry = async (
  path: string,
  options: RequestInit,
  contentType: string,
  tokenIsRequired: boolean,
) => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/${path}`, {
    ...options,
    headers: {
      ...(contentType && { "Content-Type": contentType }),
      ...(tokenIsRequired && { Authorization: `Bearer ${getAccessToken()}` }),
    },
  });

  const resClone = res.clone();

  const data: APIResponse = await resClone.json();
  const errorCode = data?.error?.code;
  if (
    resClone.status === 401 &&
    errorCode &&
    [ErrorCodes.EMAIL_NOT_VERIFIED, ErrorCodes.INVALID_CREDENTIALS].includes(
      errorCode,
    )
  ) {
    return res;
  }

  if (res.status === 401) {
    const refreshToken = await getRefreshToken();
    if (refreshToken) {
      const retryRes = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/${path}`,
        {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      if (retryRes.status === 401) {
        // probable due to no permission
        handleLogout();
        return retryRes;
      } else {
        return retryRes;
      }
    } else {
      // refresh token fails
      handleLogout();
      return res;
    }
  } else {
    return res;
  }
};

export const postAPI = async (
  path: string,
  payload: unknown,
  tokenIsRequired = true,
) => {
  return fetchWithRetry(
    path,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    "application/json",
    tokenIsRequired,
  );
};

export const putAPI = async (
  path: string,
  payload: unknown,
  tokenIsRequired = true,
) => {
  return fetchWithRetry(
    path,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
    "application/json",
    tokenIsRequired,
  );
};

export const postFormDataAPI = async (
  path: string,
  payload: Record<string, unknown>,
  stringifyArray = false,
  tokenIsRequired = true,
) => {
  const formData = new FormData();
  const payloadKeys = Object.keys(payload);

  for (const key of payloadKeys) {
    if (Array.isArray(payload[key])) {
      const values = payload[key];

      if (stringifyArray) {
        formData.append(`${key}`, JSON.stringify(values));
      } else {
        values.forEach((value) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          formData.append(`${key}`, value);
        });
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      formData.append(key, payload[key]);
    }
  }

  return fetchWithRetry(
    path,
    {
      method: "POST",
      body: formData,
    },
    "",
    tokenIsRequired,
  );
};

export const getAPI = async (path: string, tokenIsRequired = true) => {
  return fetchWithRetry(
    path,
    {
      method: "GET",
    },
    "application/json",
    tokenIsRequired,
  );
};
