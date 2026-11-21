// The site's public address. Set NEXT_PUBLIC_SITE_URL on Vercel (Step 12).
// Locally it falls back to localhost so links in metadata still work.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
