import {
  invertClass,
  invertCSS,
  invertImageClass,
  invertImageKey,
  invertKey,
  ToggleSelector,
} from "@/config/contentConfig";
import {
  applyClass,
  getStorageItem,
  injectStyle,
  setStorageItem,
} from "@/utils";

import { useWatcher } from "@/utils/observer";
import { createToggleRow, setToggle } from "@/utils/toggles";

export default async function invertFunction(displayName: string) {
  injectStyle("-gb-invert-style", invertCSS);

  const enabled = (await getStorageItem<boolean>(invertKey)) ?? false;
  applyClass(enabled, invertClass);

  const imageEnabled = (await getStorageItem<boolean>(invertImageKey)) ?? false;
  applyClass(imageEnabled, invertImageClass);

  useWatcher(() => {
    if (document.getElementById("-gb-invert-row")) return;

    const invertRow = createToggleRow(
      "-gb-invert-row",
      "-gb-invert-toggle",
      displayName,
      invertKey,
      enabled,
      async (newEnabled) => {
        applyClass(newEnabled, invertClass);

        await setStorageItem(invertImageKey, newEnabled);
        applyClass(newEnabled, invertImageClass);

        const imageToggleRow = document.getElementById("-gb-invert-image-row");
        if (imageToggleRow) {
          setToggle(imageToggleRow, ToggleSelector, newEnabled);
        }
      },
    );
    if (!invertRow) return;

    const invertImageRow = createToggleRow(
      "-gb-invert-image-row",
      "-gb-invert-image-toggle",
      "Invert Image Colors",
      invertImageKey,
      imageEnabled,
      (newImageEnabled) => {
        applyClass(newImageEnabled, invertImageClass);
      },
    );
    if (!invertImageRow) return;

    const allToggleRows = document.querySelectorAll(
      `mat-slide-toggle:not(#-gb-invert-row):not(#-gb-invert-image-row)`,
    );
    const lastToggleRow = allToggleRows[allToggleRows.length - 1];
    if (!lastToggleRow) return;

    lastToggleRow.insertAdjacentElement("afterend", invertRow);
    invertRow.insertAdjacentElement("afterend", invertImageRow);
  });
}
