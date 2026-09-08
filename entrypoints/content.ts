import { getBookType, type BookType } from "@/scripts/utils/BookType";
import { runEnabledFeatures } from "@/scripts/utils/features";
import { registerWatcher, useWatcher } from "@/scripts/utils/observer";

export default defineContentScript({
  matches: [
    "https://play.google.com/books/reader*",
    "https://books.googleusercontent.com/*",
    "https://*.googleusercontent.com/books/*",
  ],

  runAt: "document_start",

  allFrames: true,

  main() {
    registerWatcher();

    let lastBookType: BookType | null = null;

    useWatcher(() => {
      const newType = getBookType();
      if (newType !== lastBookType) {
        lastBookType = newType;
        runEnabledFeatures();
      }
    });
  },
});
