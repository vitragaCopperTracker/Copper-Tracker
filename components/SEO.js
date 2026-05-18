import Head from "next/head";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.coppertracker.com";

// canonicalUrl accepts either a full URL ("https://...") or a path ("/investments").
// Pass a path — the component builds the full URL automatically.
const SEO = ({ title, description, keywords, canonicalUrl }) => {
  const resolvedCanonical = canonicalUrl
    ? canonicalUrl.startsWith("/")
      ? `${SITE_URL}${canonicalUrl}`
      : canonicalUrl
    : SITE_URL;

  const ogImage = `${SITE_URL}/logo.png`;

  return (
    <Head>
      <title>{title}</title>

      {/* ── Favicon ─────────────────────────────────────────────────────── */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      {/*
        To add more favicon sizes, place these files in /public and
        uncomment the lines below:

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      */}

      {/* ── Basic meta ──────────────────────────────────────────────────── */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />

      {/* ── Open Graph (Facebook, LinkedIn, WhatsApp previews) ──────────── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Copper Tracker" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Copper Tracker" />
      {/*
        For best social previews, og:image should be 1200×630 px.
        Replace /logo.png with a dedicated 1200×630 image, e.g. /og-image.jpg,
        then add:
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      */}

      {/* ── Twitter / X card ────────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ── Canonical ───────────────────────────────────────────────────── */}
      <link rel="canonical" href={resolvedCanonical} />

      {/* ── JSON-LD structured data ─────────────────────────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Copper Tracker",
          url: SITE_URL,
          logo: ogImage,
          description,
        })}
      </script>
    </Head>
  );
};

export default SEO;
