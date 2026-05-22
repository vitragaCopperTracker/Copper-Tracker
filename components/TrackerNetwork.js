/**
 * TrackerNetwork — full-width dark section shown above the footer.
 * "Explore our suite of real-time commodity trackers"
 * 6 cards in a responsive grid, each linking to a tracker site.
 */
import React from "react";
import Link from "next/link";

const TRACKERS = [
  {
    name: "Lithium Tracker",
    url:  "https://www.lithiumtracker.com/",
    dot:  "bg-green-400",
  },
  {
    name: "Copper Tracker",
    url:  "https://www.coppertracker.com/",
    dot:  "bg-orange-400",
    current: true,
  },
  {
    name: "Nickel Metal Tracker",
    url:  "https://www.nickelmetaltracker.com/",
    dot:  "bg-sky-400",
  },
  {
    name: "Uranium Tracker",
    url:  "https://www.uraniumtracker.com/",
    dot:  "bg-yellow-400",
  },
  {
    name: "PGM Tracker",
    url:  "https://www.pgmtracker.com/",
    dot:  "bg-gray-300",
  },
  {
    name: "Gold & Silver Tracker",
    url:  "https://www.goldandsilvertracker.com/",
    dot:  "bg-yellow-300",
  },
];

const TrackerNetwork = () => (
  <section className="w-full bg-[#0d1117] py-12 px-4 xl:px-10">
    <div className="container mx-auto">
      {/* Header */}
      <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-3">
        Commodities Tracker Network
      </p>
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-1">
        Explore our suite of real-time commodity trackers
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        Built for investors who move fast.
      </p>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {TRACKERS.map(({ name, url, dot, current }) => (
          <Link
            key={name}
            href={url}
            target={current ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className={`group flex flex-col justify-between p-4 rounded-xl border transition-all duration-200
              ${current
                ? "bg-[#1a2332] border-accent/40 hover:border-accent"
                : "bg-[#161b22] border-white/8 hover:border-white/20 hover:bg-[#1c2128]"
              }`}
          >
            {/* Dot */}
            <span className={`w-2.5 h-2.5 rounded-full mb-4 ${dot}`} />

            {/* Name */}
            <div>
              <p className="text-white text-[13px] font-semibold leading-snug mb-2">
                {name}
              </p>
              <span className="text-accent text-[12px] font-medium group-hover:underline">
                Visit →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default TrackerNetwork;
