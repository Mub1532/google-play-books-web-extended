import invertColours from "@/scripts/invert";
import marginsFunction from "@/scripts/margins";
import sepiaFunction from "@/scripts/sepia";
import { BookType } from "@/types/books";
import { Feature } from "@/types/features";

export const allFeatures = [
  new Feature({
    name: "bookView",
    displayName: "Book View",
    script: sepiaFunction,
    excludedBookTypes: [],
  }),
  new Feature({
    name: "invertColors",
    displayName: "Invert Colors",
    script: invertColours,
    excludedBookTypes: [BookType.FLOWABLE_EPUB, BookType.RESIZABLE_FIXED_EPUB],
  }),
  new Feature({
    name: "bookMargins",
    displayName: "Change Margins",
    script: marginsFunction,
    excludedBookTypes: [BookType.COMIC, BookType.FIXED_EPUB],
  }),
];
