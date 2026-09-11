export interface FeatureOptions {
  name: string;
  displayName: string;
  script: (displayName: string, bookType: BookType) => void | Promise<void>;
  excludedBookTypes: BookType[];
}

export class Feature {
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
