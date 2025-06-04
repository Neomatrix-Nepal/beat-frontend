// hooks/useApi.ts
import { useCallback, useRef } from 'react';
import api from '@/lib/axois'; // uses your existing configured Axios instance
import { AxiosRequestConfig } from 'axios';

function useApi() {
  const cache = useRef(new Map<string, unknown>()); // Simple in-memory cache

  const sendRequest = useCallback(
    async <T = unknown>(
      config: AxiosRequestConfig,
      options?: { cache?: boolean }
    ): Promise<T> => {
      const cacheKey = JSON.stringify(config);

      // Serve from cache if available and requested
      if (options?.cache && cache.current.has(cacheKey)) {
        return cache.current.get(cacheKey) as T;
      }

      try {
        const response = await api.request<T>(config);

        // Save to cache if enabled
        if (options?.cache) {
          cache.current.set(cacheKey, response.data);
        }

        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    []
  );

  return { sendRequest };
}

export default useApi;
