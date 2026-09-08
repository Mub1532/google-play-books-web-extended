import { setStorageItem } from ".";

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
