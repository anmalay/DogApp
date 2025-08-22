export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      // Theme-aware color system using CSS variables
      primary: {
        DEFAULT: "var(--color-primary)",
        light: "var(--color-primary-light)",
        dark: "var(--color-primary-dark)",
      },
      secondary: {
        DEFAULT: "var(--color-secondary)",
        light: "var(--color-secondary-light)",
        dark: "var(--color-secondary-dark)",
      },
      background: {
        DEFAULT: "var(--color-background)",
        secondary: "var(--color-background-secondary)",
      },
      surface: {
        DEFAULT: "var(--color-surface)",
        secondary: "var(--color-surface-secondary)",
      },
      text: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        muted: "var(--color-text-muted)",
        "on-primary": "var(--color-text-on-primary)",
        "on-secondary": "var(--color-text-on-secondary)",
      },
      border: {
        DEFAULT: "var(--color-border)",
        light: "var(--color-border-light)",
        dark: "var(--color-border-dark)",
      },
      success: "var(--color-success)",
      warning: "var(--color-warning)",
      error: "var(--color-error)",
      info: "var(--color-info)",
    },
    fontFamily: {
      sans: ["Golos Text", "system-ui", "-apple-system", "sans-serif"],
    },
    fontSize: {
      // Input specific font sizes
      input: ['16px', '21px'],
      'error-text': ['14px', '18px'],
    },
    spacing: {
      // Common spacings for inputs
      '5': '20px',
      '1.5': '6px',
      // Additional pixel-based spacings
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '6': '24px',
      '8': '32px',
      '10': '40px',
      '12': '48px',
    },
    height: {
      // Input heights
      'input': '64px',
      'textarea': '124px',
    },
    minHeight: {
      // Textarea minimum height
      'textarea': '124px',
    },
    borderRadius: {
      // Input border radius
      'input': '16px',
    },
    animation: {
      "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  },
};
export const plugins = [];
