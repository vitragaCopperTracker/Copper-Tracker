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

/* ── Skeleton loader ─────────────────────────────────────────────────────── */
const Skeleton = () => (
  <div className="border border-black/10 rounded-lg p-4 space-y-4">
    <div className="h-5 w-44 bg-gray-200 rounded animate-pulse" />
    <div className="h-px bg-gray-200" />
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0">
        <div className="w-[72px] h-[72px] rounded-md bg-gray-200 animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-2.5 w-28 bg-gray-200 rounded animate-pulse" />
          <div className="h-3.5 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-3.5 w-4/5 bg-gray-200 rounded animate-pulse" />
          <div className="h-2.5 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

/* ── Single post row ─────────────────────────────────────────────────────── */
const PostRow = ({ post }) => (
  <Link
    href={post.url || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 group"
  >
    {/* Thumbnail */}
    <div className="flex-shrink-0 w-[72px] h-[72px] rounded-md overflow-hidden bg-gray-100">
      <img
        src={post.image || FALLBACK_IMAGE}
        alt={post.title ? post.title.slice(0, 40) : "Substack post"}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
      />
    </div>

    {/* Text */}
    <div className="flex flex-col min-w-0">
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
        <span className="text-[11px] text-gray-400 mt-1">
          {formatDate(post.date)}
        </span>
      )}
    </div>
  </Link>
);

/* ── Main component ──────────────────────────────────────────────────────── */
const Substacks = ({ limit = 5 }) => {
  const [posts, setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  useEffect(() => {
    fetch("/api/substack-rss")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;
  if (error || posts.length === 0) return null;

  return (
    <div className="border border-black/10 rounded-lg p-4">
      <h2 className="text-[19px] md:text-[21px] font-bold cambay mb-2 pb-2 border-b border-gray-200">
        Copper Substacks
      </h2>
      <div className="space-y-4 mt-3">
        {posts.slice(0, limit).map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Substacks;
