import { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "com.antonmalay.dogapp",
  appName: "frontend",
  webDir: "dist",
  // временно. потом удалить

  // server: {
  //   url: "http://192.168.1.13:5173",
  //   cleartext: true,
  // },

  plugins: {
    Keyboard: {
      resize: KeyboardResize.Ionic,
      resizeOnFullScreen: false,
    },
  },
};

export default config;
