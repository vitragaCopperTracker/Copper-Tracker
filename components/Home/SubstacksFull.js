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

/* ── Skeleton card ───────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="flex gap-3 p-3 border border-gray-100 rounded-lg">
    <div className="w-[80px] h-[80px] rounded-md bg-gray-200 animate-pulse flex-shrink-0" />
    <div className="flex-1 space-y-2 pt-1">
      <div className="h-2.5 w-28 bg-gray-200 rounded animate-pulse" />
      <div className="h-3.5 w-full bg-gray-200 rounded animate-pulse" />
      <div className="h-3.5 w-4/5 bg-gray-200 rounded animate-pulse" />
      <div className="h-2.5 w-16 bg-gray-200 rounded animate-pulse" />
    </div>
  </div>
);

/* ── Single post card ────────────────────────────────────────────────────── */
const PostCard = ({ post }) => (
  <Link
    href={post.url || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 group"
  >
    {/* Thumbnail */}
    <div className="flex-shrink-0 w-[80px] h-[80px] rounded-md overflow-hidden bg-gray-100">
      <img
        src={post.image || FALLBACK_IMAGE}
        alt={post.title ? post.title.slice(0, 40) : "Substack post"}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
      />
    </div>

    {/* Text */}
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
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

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

  if (error) return null;

  return (
    <section className="px-3 xl:px-3 2xl:px-12 py-10">
      {/* Section header */}
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
        {loading
          ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          : posts.slice(0, 8).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
      </div>
    </section>
  );
};

export default SubstacksFull;
