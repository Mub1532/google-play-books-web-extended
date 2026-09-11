import {
  bookViewClassToAdd,
  localKey,
  mainCSS,
  sepiaRowId,
} from "@/config/contentConfig";
import { applyClass, getStorageItem, injectStyle } from "@/utils";
import { useWatcher } from "@/utils/observer";
import { createToggleRow } from "@/utils/toggles";

export const darkThemeToggleSelector = ".dark-theme-toggle";
export const sepiaToggleClass = "-gb-sepia-toggle";

/**
 * Book View function, the one to make the page into a actual book type view
 * @param displayName
 */
export default async function sepiaFunction(displayName: string) {
  injectStyle(bookViewClassToAdd, mainCSS);

  const enabled = (await getStorageItem<boolean>(localKey)) ?? false;

  applyClass(enabled, bookViewClassToAdd);

  useWatcher(() => {
    if (document.getElementById(sepiaRowId)) return;

    const sepiaRow = createToggleRow(
      sepiaRowId,
      sepiaToggleClass,
      displayName,
      localKey,
      enabled,
      (newEnabled) => {
        applyClass(newEnabled, bookViewClassToAdd);
      },
    );
    if (!sepiaRow) return;

    const allToggleRows = document.querySelectorAll(
      `mat-slide-toggle:not(#${sepiaRowId})`,
    );
    const lastToggleRow = allToggleRows[allToggleRows.length - 1];
    if (!lastToggleRow) return;

    lastToggleRow.insertAdjacentElement("afterend", sepiaRow);
  });
}
