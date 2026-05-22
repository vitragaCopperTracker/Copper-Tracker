"use client";

import React, { useEffect, useRef, memo } from "react";

/**
 * Copper stocks confirmed available on TradingView free tier.
 * Using embed-widget-single-quote — same widget as the AAPL example provided.
 * Format: "EXCHANGE:TICKER"
 */
const COPPER_STOCKS = [
  { symbol: "NYSE:FCX",    label: "Freeport-McMoRan" },
  { symbol: "NYSE:SCCO",   label: "Southern Copper" },
  { symbol: "NYSE:TECK",   label: "Teck Resources" },
  { symbol: "NYSE:VALE",   label: "Vale S.A." },
  { symbol: "OTC:GLCNF",  label: "Glencore" },
  { symbol: "NYSE:BHP",    label: "BHP Group" },
  { symbol: "TSX:CS",      label: "Capstone Copper" },
  { symbol: "NYSE:RIO",    label: "Rio Tinto" },
  { symbol: "TSX:FM",      label: "First Quantum" },
  { symbol: "AMEX:COPX",   label: "Copper Miners ETF" },
  { symbol: "AMEX:CPER",   label: "US Copper Index" },
  { symbol: "TSX:LUN",     label: "Lundin Mining" },
];

/* ── Single widget card ──────────────────────────────────────────────────── */
const QuoteWidget = memo(({ symbol }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous widget
    container.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    container.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.innerHTML = JSON.stringify({
      symbol,
      colorTheme: "light",
      isTransparent: false,
      locale: "en",
      width: "100%",
    });

    container.appendChild(script);

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div
      className="tradingview-widget-container rounded-lg overflow-hidden border border-black/8 hover:border-accent/30 transition-colors"
      ref={containerRef}
      style={{ minHeight: "90px" }}
    />
  );
});

QuoteWidget.displayName = "QuoteWidget";

/* ── Main Snapshot component ─────────────────────────────────────────────── */
const ISnapshot = () => {
  return (
    <div className="py-5">
      <h1 className="cambay text-[22px] sm:text-3xl font-semibold">
        Snapshot
      </h1>
      <p className="text-sm text-gray-500 mt-1 mb-5">
        Real-time quotes for major copper stocks &amp; ETFs
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {COPPER_STOCKS.map(({ symbol }) => (
          <QuoteWidget key={symbol} symbol={symbol} />
        ))}
      </div>
    </div>
  );
};

export default ISnapshot;
