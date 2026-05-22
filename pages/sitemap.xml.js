/**
 * Dynamic sitemap generator — served at /sitemap.xml
 *
 * Static routes are hardcoded. Dynamic routes (stock-detail, news articles,
 * data charts) are fetched from the API at build/request time.
 *
 * To regenerate on every request during development, remove the
 * Cache-Control header below. In production the CDN (Vercel) will cache it.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.coppertracker.com";

const API_BASE = "https://platinumdjango-production.up.railway.app/api";

/** Static pages that should always appear in the sitemap */
const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/data", priority: "0.9", changefreq: "daily" },
  { path: "/news", priority: "0.9", changefreq: "daily" },
  { path: "/investments", priority: "0.8", changefreq: "weekly" },
  { path: "/C101", priority: "0.8", changefreq: "monthly" },
  { path: "/calendar", priority: "0.7", changefreq: "weekly" },
  { path: "/community", priority: "0.7", changefreq: "daily" },
  { path: "/videos", priority: "0.7", changefreq: "weekly" },
  { path: "/copper101/glossary", priority: "0.6", changefreq: "monthly" },
];

function buildUrl(path, priority = "0.5", changefreq = "weekly", lastmod = null) {
  return `
  <url>
    <loc>${SITE_URL}${path}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`.trim();
}

async function safeFetch(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getServerSideProps({ res }) {
  // Fetch dynamic data in parallel — failures return empty arrays gracefully
  const [pressReleases, stockNews, stocks, copper101Cards] = await Promise.all([
    safeFetch(`${API_BASE}/press-releases/`),
    safeFetch(`${API_BASE}/stock-news/`),
    safeFetch(`${API_BASE}/pgm-stocks/`),
    safeFetch(`${API_BASE}/copper101-cards/`),
  ]);

  const today = new Date().toISOString().split("T")[0];

  const staticUrls = STATIC_ROUTES.map(({ path, priority, changefreq }) =>
    buildUrl(path, priority, changefreq, today)
  );

  const pressReleaseUrls = pressReleases
    .filter((item) => item?.id)
    .map((item) =>
      buildUrl(
        `/news/press-release/${item.id}`,
        "0.7",
        "never",
        item.date ? item.date.split("T")[0] : today
      )
    );

  const stockNewsUrls = stockNews
    .filter((item) => item?.id)
    .map((item) =>
      buildUrl(
        `/news/stock-news/${item.id}`,
        "0.7",
        "never",
        item.date ? item.date.split("T")[0] : today
      )
    );

  const stockDetailUrls = stocks
    .filter((item) => item?.stock_ticker)
    .map((item) =>
      buildUrl(`/stock-detail/${item.stock_ticker}`, "0.6", "daily", today)
    );

  const copper101Urls = copper101Cards
    .filter((item) => item?.id)
    .map((item) =>
      buildUrl(`/copper101/${item.id}`, "0.6", "monthly", today)
    );

  const allUrls = [
    ...staticUrls,
    ...pressReleaseUrls,
    ...stockNewsUrls,
    ...stockDetailUrls,
    ...copper101Urls,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  // Cache for 1 hour on CDN, revalidate in background
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.write(sitemap);
  res.end();

  return { props: {} };
}

// This page renders nothing — the response is written directly above
export default function Sitemap() {
  return null;
}
