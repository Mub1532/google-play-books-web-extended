export async function getStorageItem<T>(
  key: string,
  area: "local" | "session" = "local",
): Promise<T | null> {
  return await storage.getItem<T>(`${area}:${key}`);
}

export async function setStorageItem<T>(
  key: string,
  value: T,
  area: "local" | "session" = "local",
): Promise<void> {
  await storage.setItem<T>(`${area}:${key}`, value);
}

export function injectStyle(id: string, css: string) {
  if (document.getElementById(id)) return;

  const element = document.createElement("style");

  element.id = id;
  element.textContent = css;

  (document.head ?? document.documentElement).appendChild(element);
}

export function applyClass(enabled: boolean, classToAdd: string) {
  document.body?.classList.toggle(classToAdd, enabled);
}

export function getElementLabel(element: Element): string {
  return (element.textContent ?? "").replace(/\s+/g, " ").trim();
}

export function cleanupClonedElement(clonedElement: Element) {
  clonedElement
    .querySelectorAll("[id]")
    .forEach((element) => element.removeAttribute("id"));
  clonedElement
    .querySelectorAll("label[for]")
    .forEach((element) => element.removeAttribute("for"));
  clonedElement
    .querySelectorAll("input")
    .forEach((element) => element.removeAttribute("name"));
}
