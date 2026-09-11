import { defineConfig } from "wxt";
import manifest from "./src/config/manifest";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  manifestVersion: 3,
  manifest: manifest,
  webExt: {
    firefoxProfile: process.env.WXT_FIREFOX_PROFILE,

    keepProfileChanges: true,
  },
});
