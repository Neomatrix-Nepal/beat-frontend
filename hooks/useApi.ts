// lib/api/authApi.ts
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: any) => void }> = [];

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

 const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,  
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
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
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const response = await axios.get('http://localhost:8000/auth/refresh-tokens', {
          withCredentials: true,  
        });

        const { accessToken, refreshToken } = response.data.tokens;

        // Update access token in store
        useAuthStore.getState().setAccessToken(accessToken);

        // Update refresh token in cookie
        document.cookie = `refreshToken=${refreshToken}; path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 3600}`;

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        document.cookie = 'refreshToken=; Max-Age=0; path=/';
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);


export default api;