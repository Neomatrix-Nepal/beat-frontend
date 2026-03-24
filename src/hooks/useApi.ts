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
});

// ✅ Attach access token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Handle response errors (refresh logic)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔴 Avoid retrying auth endpoints (VERY IMPORTANT)
    const isAuthRoute = originalRequest?.url?.includes("/auth/");

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      // ✅ If refresh already in progress → queue requests
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // ✅ Call refresh endpoint (cookie-based)
        const response = await axios.get(
          `${baseURL}/auth/refresh-tokens`,
          {
            withCredentials: true,
            timeout: 10000,
          }
        );

        const { accessToken } = response.data.tokens;

        // ✅ Save new token
        useAuthStore.getState().setAccessToken(accessToken);

        // ✅ Resolve all queued requests
        processQueue(null, accessToken);

        // ✅ Retry original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        // ❌ Refresh failed → clear auth
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();

        // ✅ Prevent infinite redirect loop
        if (typeof window !== "undefined" && !isRedirecting) {
          isRedirecting = true;

          // Optional: small delay avoids race conditions
          setTimeout(() => {
            window.location.href = "/login";
          }, 100);
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;