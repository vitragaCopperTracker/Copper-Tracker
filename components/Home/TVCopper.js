// Copper Futures sidebar chart — TradingView mini-chart widget (free plan compatible)
// Symbol: CPER — United States Copper Index Fund ETF (NYSE Arca), tracks copper futures
import React, { useEffect, useRef, memo } from "react";

function CopperTradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    // Prevent duplicate script injection on re-renders
    if (container.current.querySelector("script")) return;

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

    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(CopperTradingViewWidget);
