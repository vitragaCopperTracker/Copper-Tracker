// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function CopperTradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "250",
      symbol: "LME:CA1!",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "2",
      locale: "en",
      hide_top_toolbar: true,
      hide_legend: true,
      allow_symbol_change: false,
      save_image: false,
      calendar: false,
      hide_volume: true,
      support_host: "https://www.tradingview.com",
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