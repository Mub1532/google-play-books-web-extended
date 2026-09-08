import { getElementLabel, setStorageItem } from ".";

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

export function findStepperRow(
  labelsSelector: string,
  targetLabelText: string,
): { label: Element; ctrl: Element } | null {
  const labels = document.querySelectorAll(labelsSelector);
  for (const label of labels) {
    if (
      getElementLabel(label).toLowerCase() === targetLabelText.toLowerCase()
    ) {
      const ctrl = label.nextElementSibling;
      if (ctrl && ctrl.classList.contains("plus-minus-buttons")) {
        return { label, ctrl };
      }
    }
  }
  return null;
}

export function areIconsReady(container: Element): boolean {
  const icons = container.querySelectorAll("mat-icon");
  if (!icons.length) return false;
  for (const icon of icons) {
    if (!icon.firstElementChild && !icon.textContent?.trim()) return false;
  }
  return true;
}

export function updateStepperTextDisplay(container: Element, value: number) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (/%/.test(node.nodeValue || "")) {
      node.nodeValue = `${value}%`;
      return;
    }
  }
}

export function createStepperRow(
  options: StepperOptions,
): { labelRow: Element; ctrlRow: Element } | null {
  const {
    rowId,
    labelId,
    displayName,
    targetLabelText,
    labelsSelector,
    min = 0,
    max = 100,
    step = 1,
    storageKey,
    initialValue,
    onChange,
  } = options;

  const model = findStepperRow(labelsSelector, targetLabelText);
  if (!model || !areIconsReady(model.ctrl)) return null;

  const labelRow = model.label.cloneNode(true) as Element;
  labelRow.textContent = displayName;
  if (labelId) labelRow.id = labelId;

  const ctrlRow = model.ctrl.cloneNode(true) as Element;
  ctrlRow.id = rowId;
  ctrlRow.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));

  let currentValue = initialValue;

  const handleStep = async (delta: number) => {
    currentValue = Math.min(max, Math.max(min, currentValue + delta));
    await setStorageItem(storageKey, currentValue);
    updateStepperTextDisplay(ctrlRow, currentValue);
    await onChange(currentValue);
  };

  const buttons = ctrlRow.querySelectorAll("button");
  if (buttons[0]) {
    buttons[0].setAttribute(
      "aria-label",
      `Decrease ${displayName.toLowerCase()}`,
    );
    buttons[0].addEventListener(
      "click",
      (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        handleStep(-step);
      },
      true,
    );
  }

  if (buttons[1]) {
    buttons[1].setAttribute(
      "aria-label",
      `Increase ${displayName.toLowerCase()}`,
    );
    buttons[1].addEventListener(
      "click",
      (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        handleStep(step);
      },
      true,
    );
  }

  model.ctrl.insertAdjacentElement("afterend", ctrlRow);
  model.ctrl.insertAdjacentElement("afterend", labelRow);

  updateStepperTextDisplay(ctrlRow, currentValue);

  return { labelRow, ctrlRow };
}

export function applyScaleProperty(
  propertyName: string,
  value: number,
  divisor = 100,
  baseScale = 1,
) {
  const scale = baseScale - value / divisor;
  document.documentElement.style.setProperty(propertyName, scale.toFixed(4));
}
