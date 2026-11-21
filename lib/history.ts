// Runs in the browser only. Keeps count of how many pages of this site are
// behind the current one in the browser's history, so a "back" link knows
// whether going back would stay on the site or leave it.

let lastPath: string | null = null;
let depth = 0;
let poppedTo: string | null = null;

/** Called when the browser's back or forward button changes the page. */
export function notePopState() {
  poppedTo = window.location.pathname;
}

/**
 * Called every time the page (not just the #section) changes.
 * Returns how we got here: "first" visit, "back" (browser back/forward) or "link".
 */
export function notePath(path: string): "first" | "same" | "back" | "link" {
  if (lastPath === null) {
    lastPath = path; // the page the visitor arrived on
    return "first";
  }
  if (path === lastPath) return "same";

  let how: "back" | "link";
  if (poppedTo === path) {
    depth = Math.max(0, depth - 1); // went back
    poppedTo = null;
    how = "back";
  } else {
    depth += 1; // followed a link
    how = "link";
  }
  lastPath = path;
  return how;
}

/** True when there's a page on this site to go back to. */
export function canGoBack() {
  return depth > 0;
}
