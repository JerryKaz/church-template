import type { CSSProperties } from "react";

/** Stagger helper for `.reveal` elements: style={revealDelay(120)} */
export const revealDelay = (ms: number): CSSProperties =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
