import { marginLabelId, marginRowId } from "@/config/contentConfig";
import { BookType } from "@/types/books";
import { getBookType } from "@/utils/books";
import { runEnabledFeatures } from "@/utils/features";
import { registerWatcher, useWatcher } from "@/utils/observer";
import { applyMarginScale } from "@/utils/page";

export default defineContentScript({
  matches: [
    "https://play.google.com/books/reader*",
    "https://books.googleusercontent.com/*",
  ],

  runAt: "document_idle",

  allFrames: true,

  main() {
    registerWatcher();

    let lastBookType: BookType | null = null;

    useWatcher(() => {
      const newType = getBookType();
      if (lastBookType !== newType) {
        console.log("Book type is: ", BookType[newType]);
      }

      //  if it goes in the resizable state when user changes it, set margin to 0
      // this is the only case which is why its here
      if (newType === BookType.RESIZABLE_FIXED_EPUB) {
        applyMarginScale("--gb-page-scale", 0);
        document.getElementById(marginRowId)?.remove();
        document.getElementById(marginLabelId)?.remove();
      }

      if (newType !== lastBookType) {
        lastBookType = newType;
        runEnabledFeatures();
      }
    });
  },
});
