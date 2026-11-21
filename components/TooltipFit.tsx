"use client";

import { useEffect } from "react";

const GAP = 8; // keep tooltips at least 8px from the screen edge

/**
 * Keeps hover tooltips on screen.
 * When a skill tag or periodic-table tile is hovered, focused or tapped, this measures
 * its tooltip: if it would hide under the navbar it opens below the tag instead,
 * and if it would run off the side it is nudged back in.
 * One listener on the whole page handles every tooltip (event delegation).
 */
export default function TooltipFit() {
  useEffect(() => {
    const fit = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const owner = target?.closest?.(".skill-tag, .pt-tile");
      const tip = owner?.querySelector<HTMLElement>(".skill-tip, .pt-tip");
      if (!tip) return;

      // Measure from its normal position (above, centred)
      tip.style.translate = "";
      tip.classList.remove("tip-below");

      // Not enough room above (hidden under the sticky navbar)? Open it below instead.
      const navBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      if (tip.getBoundingClientRect().top < navBottom + GAP) tip.classList.add("tip-below");

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
