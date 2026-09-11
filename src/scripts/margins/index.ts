import {
  decreaseLineHeightSVG,
  increaseLineHeightSVG,
  marginCSS,
  marginLabelId,
  marginLocalKey,
  marginRowId,
  marginStep,
  maxMargins,
} from "@/config/contentConfig";
import type { BookType } from "@/types/books";
import { getStorageItem, injectStyle } from "@/utils";
import { useWatcher } from "@/utils/observer";
import { applyMarginScale, createStepperRow } from "@/utils/page";

export const lineHeightsSelector = "mat-dialog-content > label";

export default async function marginsFunction(
  displayName: string,
  bookType: BookType,
) {
  injectStyle("-gb-margin-style", marginCSS);

  const margin = (await getStorageItem<number>(marginLocalKey)) ?? 0;
  applyMarginScale("--gb-page-scale", margin);

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
      insertBeforeID: "font-size-label",
      firstIcon: { name: "decrease_line_height", svg: decreaseLineHeightSVG },
      secondIcon: { name: "increase_line_height", svg: increaseLineHeightSVG },
      onChange: (newMargin) => {
        applyMarginScale("--gb-page-scale", newMargin);
      },
    });
  });
}
