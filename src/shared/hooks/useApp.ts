// src/shared/hooks/useApp.ts
import { useAppStore, User } from "@store/app.store";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const useApp = () => {
  const history = useHistory();
  const { i18n } = useTranslation();

  const {
    user,
    isAuthenticated,
    token,
    isLoading,
    isOnboarded,
    language,
    theme,
    setUser,
    setToken,
    setLoading,
    setOnboarded,
    logout: logoutStore,
    setLanguage: setLanguageStore,
    setTheme,
  } = useAppStore();

  const login = useCallback(
    (token: string, userData: User) => {
      setToken(token);
      setUser(userData);
      localStorage.setItem("auth_token", token);

      if (!userData.isOnboarded) {
        history.push("/onboarding");
      } else {
        history.push("/");
      }
    },
    [setToken, setUser, history]
  );

  const logout = useCallback(() => {
    logoutStore();
    localStorage.removeItem("auth_token");
    history.push("/auth/login");
  }, [logoutStore, history]);

  const setLanguage = useCallback(
    (lang: string) => {
      setLanguageStore(lang);
      i18n.changeLanguage(lang);
    },
    [setLanguageStore, i18n]
  );

  const checkAuth = useCallback(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
    return !!storedToken;
  }, [token, setToken]);

  return {
    // State
    user,
    isAuthenticated,
    token,
    isLoading,
    isOnboarded,
    language,
    theme,

    // Actions
    login,
    logout,
    setUser,
    setLoading,
    setOnboarded,
    setLanguage,
    setTheme,
    checkAuth,
  };
};

// Export types for convenience
export type UseAppReturn = ReturnType<typeof useApp>;
