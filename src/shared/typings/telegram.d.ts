/* eslint-disable @typescript-eslint/no-explicit-any */
// Type declarations for Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready(): void;
        expand(): void;
        close(): void;
        initData: string;
        initDataUnsafe: any;
        version: string;
        platform: string;
        colorScheme: string;
        themeParams: any;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        BackButton: {
          isVisible: boolean;
          show(): void;
          hide(): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText(text: string): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
          show(): void;
          hide(): void;
          enable(): void;
          disable(): void;
          showProgress(leaveActive?: boolean): void;
          hideProgress(): void;
        };
        HapticFeedback: {
          impactOccurred(
            style: "light" | "medium" | "heavy" | "rigid" | "soft"
          ): void;
          notificationOccurred(type: "error" | "success" | "warning"): void;
          selectionChanged(): void;
        };
        showPopup(params: any, callback?: (button_id: string) => void): void;
        showAlert(message: string, callback?: () => void): void;
        showConfirm(
          message: string,
          callback?: (confirmed: boolean) => void
        ): void;
        showScanQrPopup(params: any, callback?: (text: string) => void): void;
        closeScanQrPopup(): void;
        readTextFromClipboard(callback?: (text: string) => void): void;
        requestWriteAccess(callback?: (access_granted: boolean) => void): void;
        requestContact(callback?: (contact_shared: boolean) => void): void;
        invokeCustomMethod(
          method: string,
          params?: any,
          callback?: (error: string, result: any) => void
        ): void;
      };
    };
  }
}

export {};
