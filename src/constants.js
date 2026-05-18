// ─── Site ────────────────────────────────────────────────────────────────────
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.coppertracker.com";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@coppertracker.com";

// ─── Copper market ───────────────────────────────────────────────────────────
// Static fallback spot price used in calculators and scrap tables.
// Update this when the published reference price changes.
export const COPPER_SPOT_PRICE_LB = 5.80;   // USD per pound  (COMEX HG)
export const COPPER_SPOT_PRICE_T  = 12787;  // USD per metric tonne (LME)
