import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SUBSTACKS } from "@/src/api/copperAPI";

const FALLBACK_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&s";

const truncateText = (text, words = 12) => {
  if (!text) return "";
  const clean = text.replace(/<[^>]*>/g, "").trim();
  const parts = clean.split(/\s+/);
  return parts.length <= words
    ? clean
    : parts.slice(0, words).join(" ") + "…";
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

// Derive a short author/source label from the post URL or subtitle
const getSourceLabel = (post) => {
  if (post.subtitle) return post.subtitle.toUpperCase();
  try {
    const host = new URL(post.url).hostname; // e.g. "smallcaptreasures.substack.com"
    const name = host.replace(".substack.com", "").replace(/[-_]/g, " ");
    return name.toUpperCase();
  } catch {
    return "COPPER SUBSTACK";
  }
};

const SubstackItem = ({ post }) => (
  <Link
    href={post.url || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 group"
  >
    {/* Thumbnail — left side */}
    <div className="flex-shrink-0 w-[72px] h-[72px] rounded-md overflow-hidden bg-gray-100">
      <img
        src={post.image || FALLBACK_IMAGE}
        alt={post.title ? post.title.slice(0, 40) : "Substack post"}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        onError={(e) => {
          e.target.src = FALLBACK_IMAGE;
        }}
      />
    </div>

    {/* Text — right side */}
    <div className="flex flex-col min-w-0">
      {/* Source label */}
      <span className="text-[10px] font-semibold tracking-wide text-accent uppercase mb-0.5 truncate">
        {getSourceLabel(post)}
      </span>

      {/* Title */}
      <h3 className="text-[13.5px] font-bold text-gray-900 leading-snug group-hover:text-accent transition-colors line-clamp-2">
        {post.title || "Untitled"}
      </h3>

      {/* Excerpt */}
      {post.content && (
        <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-2 leading-snug">
          {truncateText(post.content, 12)}
        </p>
      )}

      {/* Date */}
      {post.date && (
        <span className="text-[11px] text-gray-400 mt-1">
          {formatDate(post.date)}
        </span>
      )}
    </div>
  </Link>
);

const SubstacksSkeleton = () => (
  <div className="border border-black/10 rounded-lg p-4 space-y-4">
    <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
    <div className="h-px bg-gray-200" />
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex gap-3">
        <div className="w-[72px] h-[72px] rounded-md bg-gray-200 animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-2.5 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-3.5 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-3.5 w-4/5 bg-gray-200 rounded animate-pulse" />
          <div className="h-2.5 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const Substacks = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSubstacks = async () => {
      try {
        const res = await fetch(SUBSTACKS);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const formatted = (Array.isArray(data) ? data : []).map((post) => ({
          id: post.id ?? Math.random().toString(36).slice(2),
          title: post.title || "",
          url: post.url || "#",
          content: post.content || post.subtitle || "",
          subtitle: post.subtitle || "",
          image: post.image_url || FALLBACK_IMAGE,
          date: post.date || post.created_at || "",
        }));

        setPosts(formatted);
      } catch (err) {
        console.error("Substacks fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSubstacks();
  }, []);

  if (loading) return <SubstacksSkeleton />;
  if (error || posts.length === 0) return null;

  return (
    <div className="border border-black/10 rounded-lg p-4">
      <h2 className="text-[19px] md:text-[21px] font-bold cambay mb-2 pb-2 border-b border-gray-200">
        Copper Substacks
      </h2>

      <div className="space-y-4 mt-3">
        {posts.slice(0, 5).map((post) => (
          <SubstackItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Substacks;
