export interface StepperOptions {
  rowId: string;
  labelId?: string;
  displayName: string;
  targetLabelText: string;
  labelsSelector: string;
  min?: number;
  max?: number;
  step?: number;
  storageKey: string;
  initialValue: number;
  insertBeforeID?: string;
  onChange: (newValue: number) => void | Promise<void>;
  firstIcon?: { name: string; svg: string };
  secondIcon?: { name: string; svg: string };
}
