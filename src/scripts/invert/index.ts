import { invertClass, invertCSS, invertKey } from "@/config/contentConfig";
import { applyClass, getStorageItem, injectStyle } from "@/utils";

import { useWatcher } from "@/utils/observer";
import { createToggleRow } from "@/utils/toggles";

export default async function invertFunction(displayName: string) {
  injectStyle("-gb-invert-style", invertCSS);

  const enabled = (await getStorageItem<boolean>(invertKey)) ?? false;
  applyClass(enabled, invertClass);

  useWatcher(() => {
    if (document.getElementById("-gb-invert-row")) return;

    const invertRow = createToggleRow(
      "-gb-invert-row",
      "-gb-invert-toggle",
      displayName,
      invertKey,
      enabled,
      (newEnabled) => {
        applyClass(newEnabled, invertClass);
      },
    );
    if (!invertRow) return;

    const allToggleRows = document.querySelectorAll(
      `mat-slide-toggle:not(#-gb-invert-row)`,
    );
    const lastToggleRow = allToggleRows[allToggleRows.length - 1];
    if (!lastToggleRow) return;

    lastToggleRow.insertAdjacentElement("afterend", invertRow);
  });
}
