// lib/axios.ts
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      const refreshToken = getRefreshTokenFromCookie(); // see below

      try {
        const response = await axios.get(
          `http://localhost:8000/auth/refresh-tokens?refresh-token=${refreshToken}`
        );

        const newAccessToken = response.data.tokens.accessToken;
        const newRefreshToken = response.data.tokens.refreshToken;

        useAuthStore.getState().setAccessToken(newAccessToken);
        setRefreshTokenInCookie(newRefreshToken); // see below

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().clearAuth();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

// helpers for cookie (simple example)
function getRefreshTokenFromCookie(): string | null {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/refreshToken=([^;]+)/);
    return match?.[1] ?? null;
  }
  return null;
}

function setRefreshTokenInCookie(token: string) {
  if (typeof document !== 'undefined') {
    document.cookie = `refreshToken=${token}; path=/; HttpOnly; Secure`;
  }
}
