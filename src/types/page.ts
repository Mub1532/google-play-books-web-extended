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
  onChange: (newValue: number) => void | Promise<void>;
}
