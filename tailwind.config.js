export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
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
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
    },
    animation: {
      "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  },
};
export const plugins = [];
