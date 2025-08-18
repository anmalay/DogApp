// src/shared/hooks/usePlatform.ts
import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { postEvent } from "@telegram-apps/sdk";

export type Platform = "ios" | "android" | "telegram" | "web";

interface PlatformInfo {
  platform: Platform;
  isNative: boolean;
  isTelegram: boolean;
  isWeb: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export const usePlatform = (): PlatformInfo => {
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    // Initialize Telegram Mini App if available
    if (window.Telegram?.WebApp) {
      try {
        window.Telegram.WebApp.ready?.();

        // Get safe area insets for Telegram
        const safeAreaInsets = window.Telegram.WebApp.safeAreaInsets;
        if (safeAreaInsets) {
          setSafeAreaInsets({
            top: safeAreaInsets.top,
            bottom: safeAreaInsets.bottom,
            left: safeAreaInsets.left,
            right: safeAreaInsets.right,
          });
        }
      } catch (error) {
        console.error("Failed to initialize Telegram WebApp:", error);
      }
    } else {
      // For web/native, use CSS env variables
      setSafeAreaInsets({
        top: parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "env(safe-area-inset-top)"
          ) || "0"
        ),
        bottom: parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "env(safe-area-inset-bottom)"
          ) || "0"
        ),
        left: parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "env(safe-area-inset-left)"
          ) || "0"
        ),
        right: parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "env(safe-area-inset-right)"
          ) || "0"
        ),
      });
    }
  }, []);

  const getPlatform = (): Platform => {
    if (window.Telegram?.WebApp) {
      return "telegram";
    }

    const platform = Capacitor.getPlatform();
    if (platform === "ios") return "ios";
    if (platform === "android") return "android";

    return "web";
  };

  const platform = getPlatform();

  return {
    platform,
    isNative: platform === "ios" || platform === "android",
    isTelegram: platform === "telegram",
    isWeb: platform === "web",
    isIOS: platform === "ios",
    isAndroid: platform === "android",
    safeAreaInsets,
  };
};

// Utility functions for platform-specific actions
export const platformUtils = {
  // Close app or go back
  close: () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    } else {
      window.history.back();
    }
  },

  // Expand to full height (Telegram)
  expand: () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  },

  // Show confirm dialog
  showConfirm: (message: string): Promise<boolean> => {
    if (window.Telegram?.WebApp) {
      return new Promise((resolve) => {
        window.Telegram.WebApp.showConfirm(message, (confirmed) => {
          resolve(confirmed);
        });
      });
    }
    return Promise.resolve(window.confirm(message));
  },

  // Show alert
  showAlert: (message: string): Promise<void> => {
    if (window.Telegram?.WebApp) {
      return new Promise((resolve) => {
        window.Telegram.WebApp.showAlert(message, () => {
          resolve();
        });
      });
    }
    window.alert(message);
    return Promise.resolve();
  },

  // Haptic feedback
  haptic: {
    impact: (style: "light" | "medium" | "heavy" = "light") => {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      }
    },
    notification: (type: "error" | "success" | "warning" = "success") => {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(type);
      }
    },
    selection: () => {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }
    },
  },

  // Open external link
  openLink: (url: string) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(url);
    } else {
      window.open(url, "_blank");
    }
  },

  // Share data
  share: async (data: { title?: string; text?: string; url?: string }) => {
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else if (window.Telegram?.WebApp) {
      postEvent("web_app_share", { text: data.text || data.title || data.url });
    }
  },
};
