// Copper Futures sidebar chart — TradingView mini-chart widget (free plan compatible)
// Symbol: CPER — United States Copper Index Fund ETF (NYSE Arca), tracks copper futures
import React, { useEffect, useRef, useState, memo } from "react";

function CopperTradingViewWidget() {
  const container = useRef();
  const [loadFailed, setLoadFailed] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    // Prevent duplicate script injection
    if (container.current.querySelector("script")) return;

    // Timeout - if widget doesn't load in 10 seconds, assume failed
    timeoutRef.current = setTimeout(() => {
      setLoadFailed(true);
    }, 10000);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: "AMEX:CPER",
      width: "100%",
      height: "220",
      locale: "en",
      dateRange: "12M",
      colorTheme: "light",
      isTransparent: false,
      autosize: false,
      largeChartUrl: "",
      noTimeScale: false,
      chartOnly: false,
    });

    // Handle script load error
    script.onerror = () => {
      setLoadFailed(true);
      clearTimeout(timeoutRef.current);
    };

    // Clear timeout on successful load
    script.onload = () => {
      clearTimeout(timeoutRef.current);
    };

    container.current.appendChild(script);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Hide entire section if load failed
  if (loadFailed) return null;

  return (
    <div className="border border-black/10 rounded-lg pt-3 pl-3 pb-2 pr-3">
      <h2 className="text-[21px] cambay font-bold mb-3 border-b border-black/10 pb-1">
        Copper Futures
      </h2>
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(CopperTradingViewWidget);