type ObserverCallback = () => void;

const callbacks: ObserverCallback[] = [];
let observerStarted = false;

export function useWatcher(
  callback: ObserverCallback,
  minIntervalMs: number = 20,
) {
  let lastRun = 0;
  const throttledCallback = () => {
    const now = Date.now();
    if (now - lastRun < minIntervalMs) return;
    lastRun = now;
    callback();
  };

  callbacks.push(throttledCallback);
  callback();
  registerWatcher();
}

export function registerWatcher() {
  if (observerStarted) return;
  observerStarted = true;

  const observer = new MutationObserver(() => {
    for (const callback of callbacks) {
      callback();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}
