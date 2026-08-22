export type ScrollPayload = { y: number; max: number };

export function getScrollRoot(): HTMLElement | Window {
  if (typeof document === 'undefined') return window;
  const snap = document.querySelector<HTMLElement>('.snap-container');
  return snap ?? window;
}

export function readScrollY(root: HTMLElement | Window): number {
  if (root === window || !('scrollTop' in root)) return window.scrollY;
  return root.scrollTop;
}

export function readScrollMax(root: HTMLElement | Window): number {
  if (root === window || !('scrollHeight' in root)) {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }
  return Math.max(0, root.scrollHeight - root.clientHeight);
}

export function emitSiteScroll(root: HTMLElement | Window) {
  const y = readScrollY(root);
  const max = readScrollMax(root);
  window.dispatchEvent(new CustomEvent<ScrollPayload>('plb-scroll', { detail: { y, max } }));
}

export function scrollRootTo(top: number) {
  const root = getScrollRoot();
  if (root === window) {
    window.scrollTo({ top, behavior: 'smooth' });
  } else {
    root.scrollTo({ top, behavior: 'smooth' });
  }
}
