import type { UserManifest } from "wxt";

export default {
  name: "Books Extended: for Google Play Books™",
  description:
    "Extension to add features to Google Play Books™, such as page animations, bubble zoom, book theme etc.",
  version: "0.1",
  permissions: ["storage"],
  icons: {
    16: "/icons/16.png",
    32: "/icons/32.png",
    48: "/icons/48.png",
    128: "/icons/128.png",
  },
} satisfies UserManifest;
