import {
  marginCSS,
  marginLabelId,
  marginLocalKey,
  marginRowId,
  marginStep,
  maxMargins,
} from "@/scripts/configs";
import { getStorageItem, injectStyle } from "@/scripts/utils";
import { useWatcher } from "@/scripts/utils/observer";
import { applyScaleProperty, createStepperRow } from "@/scripts/utils/page";
import { BookType } from "../utils/BookType";

export const lineHeightsSelector = "mat-dialog-content > label";

export default async function marginsFunction(
  displayName: string,
  bookType: BookType,
) {
  injectStyle("-gb-margin-style", marginCSS);

  const margin = (await getStorageItem<number>(marginLocalKey)) ?? 0;
  applyScaleProperty("--gb-page-scale", margin);

  useWatcher(() => {
    if (document.getElementById(marginRowId)) return;

    createStepperRow({
      rowId: marginRowId,
      labelId: marginLabelId,
      displayName,
      targetLabelText: "Line height",
      labelsSelector: lineHeightsSelector,
      min: 0,
      max: maxMargins,
      step: marginStep,
      storageKey: marginLocalKey,
      initialValue: margin,
      onChange: (newMargin) => {
        applyScaleProperty("--gb-page-scale", newMargin);
      },
    });
  });
}
