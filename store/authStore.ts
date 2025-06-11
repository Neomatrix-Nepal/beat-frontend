// lib/stores/authStore.ts
import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  user: {
    id: number;
    email: string;
    roles: string[];
    verified: boolean;
    created_at: string;
    updated_at: string;
  } | null;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: AuthState['user']) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  clearAuth: () => set({ accessToken: null, user: null }),
}));