// Copper Price Chart — TradingView symbol-overview widget (free plan compatible)
// Symbol: CAPITALCOM:COPPER — Copper CFD, universally available on TradingView free tier
import React, { useEffect, useRef, memo } from "react";

function CopperCFDTradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    // Prevent duplicate script injection on re-renders
    if (container.current.querySelector("script")) return;

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

    container.current.appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container rounded-xl"
      ref={container}
      style={{ height: "290px" }}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(CopperCFDTradingViewWidget);
