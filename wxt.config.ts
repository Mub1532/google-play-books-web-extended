import { preact } from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";
import manifest from "./config/manifest";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/auto-icons"],
  vite: () => ({
    plugins: [tailwindcss(), preact()],
  }),
  autoIcons: {
    grayscaleOnDevelopment: false,
  },
  manifestVersion: 3,
  manifest: manifest,
  // so it uses same profile etc
  webExt: {
    firefoxProfile: import.meta.env.FIREFOX_PROFILE,

    keepProfileChanges: true,
  },
});
