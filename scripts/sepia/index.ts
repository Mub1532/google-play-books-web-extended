import {
  classToAdd,
  localKey,
  mainCSS,
  sepiaRowId,
  ToggleSelector,
} from "@/scripts/configs";
import {
  applyClass,
  cleanupClonedElement,
  getStorageItem,
  injectStyle,
} from "@/scripts/utils";
import { useWatcher } from "@/scripts/utils/observer";
import { setToggle, useToggleListener } from "@/scripts/utils/page";

export const darkThemeToggleSelector = ".dark-theme-toggle";
export const sepiaToggleClass = "-gb-sepia-toggle";

/**
 * Book View function, the one to make the page into a actual book type view
 * TODO: Detect if its flowable book, fixed epub or comic, cuz this should only run on flowable
 * @param displayName
 */
export default async function sepiaFunction(displayName: string) {
  injectStyle(classToAdd, mainCSS);

  const enabled = (await getStorageItem<boolean>(localKey)) ?? false;

  applyClass(enabled, classToAdd);

  console.log("hello is it: ", enabled);

  useWatcher(() => {
    if (document.getElementById(sepiaRowId)) return;

    // get the dark theme toggle so i can put another toggle for sepia under it
    const toggleRow = document.querySelector(darkThemeToggleSelector);
    if (!toggleRow) return;

    const sepiaRow = toggleRow.cloneNode(true) as Element;
    sepiaRow.id = sepiaRowId;

    const label = sepiaRow.querySelector("label span");

    if (label) label.textContent = displayName;

    sepiaRow.classList.remove(darkThemeToggleSelector.replace(".", ""));
    sepiaRow.classList.add(sepiaToggleClass);

    cleanupClonedElement(sepiaRow);

    setToggle(sepiaRow, ToggleSelector, enabled);

    useToggleListener(
      sepiaRow,
      ToggleSelector,
      localKey,
      enabled,
      (newEnabled) => {
        applyClass(newEnabled, classToAdd);
      },
    );

    const allToggleRows = document.querySelectorAll(
      `mat-slide-toggle:not(#${sepiaRowId})`,
    );
    const lastToggleRow = allToggleRows[allToggleRows.length - 1];
    if (!lastToggleRow) return;

    lastToggleRow.insertAdjacentElement("afterend", sepiaRow);
  });
}
