import { marginLabelId, marginRowId } from "@/config/contentConfig";
import invertFunction from "@/scripts/invert";
import marginsFunction from "@/scripts/margins";
import sepiaFunction from "@/scripts/sepia";
import { BookType } from "@/types/books";

interface FeatureOptions {
  name: string;
  displayName: string;
  script: (displayName: string, bookType: BookType) => void | Promise<void>;
  excludedBookTypes: BookType[];
}

class Feature {
  name: string;
  displayName: string;
  script: (displayName: string, bookType: BookType) => void | Promise<void>;
  excludedBookTypes: BookType[];

  constructor(options: FeatureOptions) {
    this.name = options.name;
    this.displayName = options.displayName;
    this.script = options.script;
    this.excludedBookTypes = options.excludedBookTypes;
  }
}

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
    script: invertFunction,
    excludedBookTypes: [BookType.FLOWABLE_EPUB, BookType.RESIZABLE_FIXED_EPUB],
  }),
  new Feature({
    name: "bookMargins",
    displayName: "Change Margins",
    script: marginsFunction,
    excludedBookTypes: [BookType.COMIC, BookType.FIXED_EPUB],
  }),
];

const alreadyRunFeatures = new Set<string>();

export async function runEnabledFeatures() {
  const bookType = getBookType();

  if (bookType === BookType.UNKNOWN) return;

  //  if it goes in the resizable state when user changes it, set margin to 0
  // this is the only case which is why its here
  if (bookType === BookType.RESIZABLE_FIXED_EPUB) {
    applyMarginScale("--gb-page-scale", 0);
    document.getElementById(marginRowId)?.remove();
    document.getElementById(marginLabelId)?.remove();
  }

  for (const feature of allFeatures) {
    if (feature.excludedBookTypes.includes(bookType)) continue;
    if (alreadyRunFeatures.has(feature.name)) continue;

    const enabled = (await getStorageItem<boolean>(feature.name)) ?? true;
    if (enabled) {
      alreadyRunFeatures.add(feature.name);
      feature.script(feature.displayName, bookType);
    }
  }
}
