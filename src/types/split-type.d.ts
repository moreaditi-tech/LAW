declare module 'split-type' {
  export default class SplitType {
    constructor(
      target: string | Element | Element[] | NodeListOf<Element>,
      options?: { types?: string; tagName?: string }
    );
    chars: HTMLElement[] | null;
    words: HTMLElement[] | null;
    lines: HTMLElement[] | null;
    revert(): void;
  }
}
