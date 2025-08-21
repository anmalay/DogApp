export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      // Legacy colors (keeping for backward compatibility)
      primary: {
        DEFAULT: "#5C6BC0",
        light: "#7986CB",
        dark: "#5161a9",
      },
      accent: {
        DEFAULT: "#FFCA28",
        light: "#ffcf3e",
        dark: "#e0b223",
      },
      // New Cool color palette
      cool: {
        gray: "#F3F3F3",
        dark: "#3F335A",
        white: "#FFFFFF",
        transparent: "#FFFFFF",
        green: "#23BA6E",
        pink: "#FE9CC5",
        "medium-violet": "#645A7A",
        "light-viola": "#E4DFF0",
        "dark-gray": "#808794",
        red: "#F43F5E",
        violet: "#F3EEFF",
        "red-light": "#FCE5EA",
        viola: "#8552FF",
      },
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
    },
    height: {
      // Input heights
      'input': '64px',
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
