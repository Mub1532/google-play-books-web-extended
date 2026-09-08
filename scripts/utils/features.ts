import sepiaFunction from "@/scripts/sepia";
import { getStorageItem } from ".";
import invertFunction from "../invert";
import { BookType, getBookType } from "./BookType";

interface FeatureOptions {
  name: string;
  displayName: string;
  script: (displayName: string) => void | Promise<void>;
  excludedBookTypes: BookType[];
}

class Feature {
  name: string;
  displayName: string;
  script: (displayName: string) => void | Promise<void>;
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
    excludedBookTypes: [BookType.COMIC],
  }),
  new Feature({
    name: "invertColors",
    displayName: "Invert Colors",
    script: invertFunction,
    excludedBookTypes: [],
  }),
];

const alreadyRunFeatures = new Set<string>();

export async function runEnabledFeatures() {
  const bookType = getBookType();

  for (const feature of allFeatures) {
    if (feature.excludedBookTypes.includes(bookType)) continue;
    if (alreadyRunFeatures.has(feature.name)) continue;

    const enabled = (await getStorageItem<boolean>(feature.name)) ?? true;
    if (enabled) {
      alreadyRunFeatures.add(feature.name);
      feature.script(feature.displayName);
    }
  }
}
