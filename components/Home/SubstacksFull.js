/**
 * SubstacksFull — full-width Copper Substacks section
 * Displayed below the StayAhead / "See our Latest Copper Data" section
 * on the homepage. Shows up to 8 posts in a responsive grid.
 */
import React, { useState, useEffect } from "react";
import Link from "next/link";

const FALLBACK_IMAGE = "/no-image.png";

const formatDate = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

/* ── Single post card ────────────────────────────────────────────────────── */
const PostCard = ({ post }) => (
  <Link
    href={post.url || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 group"
  >
    <div className="flex-shrink-0 w-[80px] h-[80px] rounded-md overflow-hidden bg-gray-100">
      <img
        src={post.image || FALLBACK_IMAGE}
        alt={post.title ? post.title.slice(0, 40) : "Substack post"}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
      />
    </div>

    <div className="flex flex-col min-w-0 flex-1">
      <span className="text-[10px] font-semibold tracking-wide text-accent uppercase mb-0.5 truncate">
        {post.source}
      </span>
      <h3 className="text-[13.5px] font-bold text-gray-900 leading-snug group-hover:text-accent transition-colors line-clamp-2">
        {post.title}
      </h3>
      {post.description && (
        <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-2 leading-snug">
          {post.description}
        </p>
      )}
      {post.date && (
        <span className="text-[11px] text-gray-400 mt-1.5">
          {formatDate(post.date)}
        </span>
      )}
    </div>
  </Link>
);

/* ── Main component ──────────────────────────────────────────────────────── */
const SubstacksFull = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/substack-rss")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Return null while loading
  if (loading) return null;

  // Return null if error or no posts
  if (error || posts.length === 0) return null;

  return (
    <section className="px-3 xl:px-3 2xl:px-12 py-10">
      {/* Section header - only shows when data exists */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px] md:text-[26px] font-bold cambay">
          Copper Substacks
        </h2>
        <Link
          href="https://substack.com/search?q=copper+mining"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-accent hover:text-accent/70 transition-colors"
        >
          View all &gt;
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.slice(0, 8).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default SubstacksFull;