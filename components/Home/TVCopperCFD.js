// // Copper Price Chart — TradingView symbol-overview widget (free plan compatible)
// // Symbol: CAPITALCOM:COPPER — Copper CFD, universally available on TradingView free tier
import React, { useEffect, useRef, useState, memo } from "react";

function CopperCFDTradingViewWidget() {
  const container = useRef();
  const [loadFailed, setLoadFailed] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    if (container.current.querySelector("script")) return;

    // Timeout - if widget doesn't load in 10 seconds, assume failed
    timeoutRef.current = setTimeout(() => {
      setLoadFailed(true);
    }, 10000);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [["Copper", "CAPITALCOM:COPPER|1D"]],
      chartOnly: false,
      width: "100%",
      height: "290",
      locale: "en",
      colorTheme: "light",
      autosize: false,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: true,
      hideSymbolLogo: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      fontSize: "10",
      noTimeScale: false,
      valuesTracking: "1",
      changeMode: "price-and-percent",
      chartType: "area",
      maLineColor: "#2962FF",
      maLineWidth: 1,
      maLength: 9,
      lineWidth: 2,
      lineType: 0,
      dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
    });

    script.onerror = () => {
      setLoadFailed(true);
      clearTimeout(timeoutRef.current);
    };

    script.onload = () => {
      clearTimeout(timeoutRef.current);
    };

    container.current.appendChild(script);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  if (loadFailed) return null;

  return (
    <div className="border border-black/10 rounded-lg pt-3 pl-3 pb-2 pr-3">
      <h2 className="text-[21px] font-bold mb-2 pb-1">Copper Price Chart</h2>
      <div
        className="tradingview-widget-container rounded-xl"
        ref={container}
        style={{ height: "290px" }}
      >
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(CopperCFDTradingViewWidget);