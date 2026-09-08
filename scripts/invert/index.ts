import {
  invertClass,
  invertCSS,
  invertImageClass,
  invertImageKey,
  invertKey,
  ToggleSelector,
} from "@/scripts/configs";
import {
  applyClass,
  cleanupClonedElement,
  getStorageItem,
  injectStyle,
  setStorageItem,
} from "@/scripts/utils";

import { darkThemeToggleSelector } from "@/scripts/sepia";
import { useWatcher } from "@/scripts/utils/observer";
import { setToggle, useToggleListener } from "@/scripts/utils/page";

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
        if (newEnabled) {
          const imageAlreadySet =
            (await getStorageItem<boolean>(invertImageKey)) !== null;
          if (!imageAlreadySet) await setStorageItem(invertImageKey, true);
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

function createToggleRow(
  id: string,
  className: string,
  displayName: string,
  storageKey: string,
  enabled: boolean,
  onToggle: (enabled: boolean) => void | Promise<void>,
): Element | null {
  const toggleRow = document.querySelector(darkThemeToggleSelector);
  if (!toggleRow) return null;

  const row = toggleRow.cloneNode(true) as Element;
  row.id = id;

  const label = row.querySelector("label span");
  if (label) label.textContent = displayName;

  row.classList.remove(darkThemeToggleSelector.replace(".", ""));
  row.classList.add(className);

  cleanupClonedElement(row);
  setToggle(row, ToggleSelector, enabled);
  useToggleListener(row, ToggleSelector, storageKey, enabled, onToggle);

  return row;
}
