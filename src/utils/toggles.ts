import { ToggleSelector } from "@/config/contentConfig";
import { darkThemeToggleSelector } from "@/scripts/sepia";

export function setToggle(row: Element, toggleSelector: string, on: boolean) {
  row.classList.toggle("mat-mdc-slide-toggle-checked", on);
  row.classList.toggle("mat-checked", on);

  const toggleElement = row.querySelector(toggleSelector);
  if (!toggleElement) return;

  if (toggleElement.tagName === "INPUT") {
    (toggleElement as HTMLInputElement).checked = on;
    return;
  }

  toggleElement.setAttribute("aria-checked", on ? "true" : "false");
  toggleElement.classList.toggle("mdc-switch--selected", on);
  toggleElement.classList.toggle("mdc-switch--checked", on);
  toggleElement.classList.toggle("mdc-switch--unselected", !on);
  toggleElement.classList.toggle("mat-mdc-slide-toggle-checked", on);
  toggleElement.classList.toggle("mat-checked", on);

  const innerCheckbox = toggleElement.querySelector('input[type="checkbox"]');
  if (innerCheckbox) (innerCheckbox as HTMLInputElement).checked = on;
}

export function useToggleListener(
  row: Element,
  toggleSelector: string,
  storageKey: string,
  currentEnabled: boolean,
  onToggle: (enabled: boolean) => void | Promise<void>,
) {
  let enabled = currentEnabled;

  row.addEventListener(
    "click",
    async (event) => {
      event.preventDefault();
      event.stopPropagation();

      enabled = !enabled;
      await setStorageItem(storageKey, enabled);
      setToggle(row, toggleSelector, enabled);
      await onToggle(enabled);
    },
    true,
  );
}

export function createToggleRow(
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
