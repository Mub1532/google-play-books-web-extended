import { marginLabelId, marginRowId } from "@/scripts/configs";
import { BookType, getBookType } from "@/scripts/utils/BookType";
import { runEnabledFeatures } from "@/scripts/utils/features";
import { registerWatcher, useWatcher } from "@/scripts/utils/observer";
import { applyScaleProperty } from "@/scripts/utils/page";

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
      console.log("Book type is: ", newType.toString());

      //  if it goes in the resizable state when user changes it, set margin to 0
      // this is the only case which is why its here
      if (newType === BookType.RESIZABLE_FIXED_EPUB) {
        applyScaleProperty("--gb-page-scale", 0);
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
