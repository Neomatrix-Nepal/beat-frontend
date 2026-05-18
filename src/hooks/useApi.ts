import axios from "axios";
import { useAuthStore } from "@/src/store/authStore";

let isRefreshing = false;
let isRedirecting = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });

  failedQueue = [];
};

export const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.beatpasal.com";

const api = axios.create({
  baseURL,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

//
// RESPONSE INTERCEPTOR
//
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Prevent crashes
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthRoute =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/logout");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const response = await axios.get(
          `${baseURL}/admin/auth/refresh-tokens`,
          {
            withCredentials: true,

            headers: {
              "x-admin-panel": "true",
            },

            timeout: 10000,
          },
        );

        const accessToken = response.data?.tokens?.accessToken;

        if (!accessToken) {
          throw new Error("No access token returned");
        }

        useAuthStore.getState().setAccessToken(accessToken);

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        useAuthStore.getState().clearAuth();

        if (typeof window !== "undefined" && !isRedirecting) {
          isRedirecting = true;

          try {
            await axios.post(
              `${baseURL}/admin/auth/logout`,
              {},
              {
                withCredentials: true,
              },
            );
          } catch {}

          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
