import Head from "next/head";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.coppertracker.com";

/**
 * SEO component for Next.js Pages Router.
 *
 * Props:
 *  - title        {string}  Page <title> and og:title
 *  - description  {string}  Meta description and og:description
 *  - keywords     {string}  Meta keywords (comma-separated)
 *  - canonicalUrl {string}  Path ("/investments") or full URL. Defaults to site root.
 *  - ogImage      {string}  Full URL to a 1200×630 social preview image. Defaults to /og-image.png.
 *  - noIndex      {boolean} Set true to emit "noindex, nofollow" (auth pages, dashboard, etc.)
 *  - jsonLd       {object}  Optional page-specific JSON-LD schema object. Merged with base WebSite schema.
 */
const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage: ogImageProp,
  noIndex = false,
  jsonLd,
}) => {
  const resolvedCanonical = canonicalUrl
    ? canonicalUrl.startsWith("/")
      ? `${SITE_URL}${canonicalUrl}`
      : canonicalUrl
    : SITE_URL;

  // Use a dedicated 1200×630 OG image when available, fall back to logo.
  const ogImage = ogImageProp || `${SITE_URL}/og-image.png`;

  const robotsContent = noIndex ? "noindex, nofollow" : "index, follow";

  // Base WebSite schema — always present.
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Copper Tracker",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description,
  };

  // Merge caller-supplied schema if provided.
  const schemaOutput = jsonLd
    ? [baseSchema, jsonLd]
    : baseSchema;

  return (
    <Head>
      <title>{title}</title>

      {/* ── Favicon ─────────────────────────────────────────────────────── */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* ── Basic meta ──────────────────────────────────────────────────── */}
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robotsContent} />

      {/* ── Open Graph ──────────────────────────────────────────────────── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Copper Tracker" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* ── Twitter / X card ────────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CopperTracker" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ── Canonical ───────────────────────────────────────────────────── */}
      <link rel="canonical" href={resolvedCanonical} />

      {/* ── JSON-LD structured data ─────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOutput) }}
      />
    </Head>
  );
};

export default SEO;
