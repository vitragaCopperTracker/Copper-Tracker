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

const PostRow = ({ post }) => (
  <Link
    href={post.url || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 group"
  >
    <div className="flex-shrink-0 w-[72px] h-[72px] rounded-md overflow-hidden bg-gray-100">
      <img
        src={post.image || FALLBACK_IMAGE}
        alt={post.title ? post.title.slice(0, 40) : "Substack post"}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
      />
    </div>

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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  // Return null while loading
  if (loading) return null;

  //  Return null if error or no posts
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