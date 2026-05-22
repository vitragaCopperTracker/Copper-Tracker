/**
 * NetworkBar — slim tracker network strip shown just below the main navbar.
 * Matches the design: "NETWORK" label + colored dot pills for each tracker site.
 * Copper Tracker is highlighted as the active site.
 */
import React from "react";
import Link from "next/link";

const TRACKERS = [
  { name: "Platinum",     url: "https://www.pgmtracker.com/",              dot: "bg-[#e5e7eb]",   active: false },
  { name: "Lithium",      url: "https://www.lithiumtracker.com/",          dot: "bg-green-400",   active: false },
  { name: "Copper",       url: "https://www.coppertracker.com/",           dot: "bg-orange-400",  active: true  },
  { name: "Nickel",       url: "https://www.nickelmetaltracker.com/",      dot: "bg-sky-400",     active: false },
  { name: "Uranium",      url: "https://www.uraniumtracker.com/",          dot: "bg-yellow-400",  active: false },
  { name: "Gold & Silver",url: "https://www.goldandsilvertracker.com/",    dot: "bg-yellow-300",  active: false },
];

const NetworkBar = () => (
  <div className="w-full bg-white border-b border-black/8 z-40">
    <div className="container mx-auto px-4 xl:px-10 py-1.5 flex items-center gap-3 overflow-x-auto scrollbar-none">
      {/* Label */}
      <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase whitespace-nowrap mr-1 flex-shrink-0">
        Network
      </span>

      {/* Tracker pills */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {TRACKERS.map(({ name, url, dot, active }) => (
          <Link
            key={name}
            href={url}
            target={active ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium whitespace-nowrap transition-colors duration-150
              ${active
                ? "bg-accent/10 text-accent border border-accent/30"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              }`}
          >
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
            {name}
            {active && (
              <svg className="w-3 h-3 ml-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default NetworkBar;
