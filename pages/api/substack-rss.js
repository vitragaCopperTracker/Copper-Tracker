/**
 * /api/substack-rss
 *
 * Fetches the latest posts from multiple copper/mining-focused Substack
 * RSS feeds, merges them, sorts by date, and returns the freshest N posts.
 *
 * All fetching happens server-side so there are no CORS issues on the client.
 */

const FEEDS = [
  { name: "Amanda Van Dyke",      url: "https://amandavandyke.substack.com/feed" },
  { name: "Mining Stock Analyst", url: "https://miningstockanalyst.substack.com/feed" },
  { name: "Metals and Miners",    url: "https://metalsandminers.substack.com/feed" },
  { name: "Resourceful Insights", url: "https://resourcefulinsights.substack.com/feed" },
  { name: "Mining Discovery",     url: "https://miningdiscovery.substack.com/feed" },
  { name: "Copper + Typeface",    url: "https://copperandtypeface.substack.com/feed" },
];

/** Pull the text content of an XML tag (first occurrence). */
function getTag(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  if (!m) return "";
  // Strip CDATA wrappers and HTML tags
  return m[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

/** Extract the first <img src> from an <enclosure> or <media:content> or <description> */
function getImage(itemXml) {
  // <enclosure url="..." type="image/..."/>
  const enc = itemXml.match(/<enclosure[^>]+url="([^"]+)"[^>]+type="image/i);
  if (enc) return enc[1];

  // <media:content url="..." medium="image"/>
  const media = itemXml.match(/<media:content[^>]+url="([^"]+)"/i);
  if (media) return media[1];

  // First <img src="..."> inside description
  const img = itemXml.match(/<img[^>]+src="([^"]+)"/i);
  if (img) return img[1];

  return null;
}

/** Parse <item> blocks out of an RSS XML string. */
function parseItems(xml, sourceName, limit = 3) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRe.exec(xml)) !== null && items.length < limit) {
    const block = match[1];
    const title       = getTag(block, "title");
    const link        = getTag(block, "link") || getTag(block, "guid");
    const pubDate     = getTag(block, "pubDate");
    const description = getTag(block, "description").slice(0, 160);
    const image       = getImage(block);

    if (!title || !link) continue;

    items.push({
      id:          `${sourceName}-${link}`,
      source:      sourceName,
      title,
      url:         link,
      description,
      image,
      date:        pubDate ? new Date(pubDate).toISOString() : null,
    });
  }

  return items;
}

async function fetchFeed({ name, url }) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "CopperTracker/1.0 RSS Reader" },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseItems(xml, name, 3);
  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const results = await Promise.all(FEEDS.map(fetchFeed));

  const posts = results
    .flat()
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 10);

  // Cache for 30 minutes on CDN
  res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=3600");
  res.status(200).json(posts);
}
