"use client";

import { useEffect } from "react";

const GAP = 8; // keep tooltips at least 8px from the screen edge

/**
 * Keeps hover tooltips on screen.
 * When a skill tag or periodic-table tile near the edge is hovered, focused or tapped,
 * this measures its tooltip and nudges it sideways so it isn't cut off.
 * One listener on the whole page handles every tooltip (event delegation).
 */
export default function TooltipFit() {
  useEffect(() => {
    const fit = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const owner = target?.closest?.(".skill-tag, .pt-tile");
      const tip = owner?.querySelector<HTMLElement>(".skill-tip, .pt-tip");
      if (!tip) return;

      tip.style.translate = ""; // measure from its normal position
      const rect = tip.getBoundingClientRect();
      const screen = document.documentElement.clientWidth;
      let shift = 0;
      if (rect.right > screen - GAP) shift = screen - GAP - rect.right;
      if (rect.left + shift < GAP) shift = GAP - rect.left;
      if (shift !== 0) tip.style.translate = `${Math.round(shift)}px 0`;
    };

    document.addEventListener("pointerover", fit);
    document.addEventListener("focusin", fit);
    return () => {
      document.removeEventListener("pointerover", fit);
      document.removeEventListener("focusin", fit);
    };
  }, []);

  return null;
}
