// src/shared/store/app.store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  about?: string | null;
  avatar?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  categories?: string[];
  contactMethod?: string;
  country?: string;
  city?: string;
  isOnboarded?: boolean;
}

export interface AppState {
  // User data
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;

  // App state
  isLoading: boolean;
  isOnboarded: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setOnboarded: (onboarded: boolean) => void;
  logout: () => void;

  // Preferences
  language: string;
  theme: "light" | "dark" | "auto";
  setLanguage: (language: string) => void;
  setTheme: (theme: "light" | "dark" | "auto") => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        token: null,
        isLoading: false,
        isOnboarded: false,
        language: "en",
        theme: "auto",

        // Actions
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
          }),

        setToken: (token) =>
          set({
            token,
            isAuthenticated: !!token,
          }),

        setLoading: (isLoading) => set({ isLoading }),

        setOnboarded: (isOnboarded) => set({ isOnboarded }),

        logout: () =>
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isOnboarded: false,
          }),

        setLanguage: (language) => set({ language }),

        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "app-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isOnboarded: state.isOnboarded,
          language: state.language,
          theme: state.theme,
        }),
      }
    )
  )
);
