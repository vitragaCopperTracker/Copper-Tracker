import React, { useState, useEffect } from "react";

const PlatinumPrice = () => {
  const [copperData, setCopperData] = useState(null);

  useEffect(() => {
    // Fetch CME copper spot price data from the API
    fetch('/api/cme-copper-spot')
      .then((response) => response.json())
      .then((response) => {
        if (response.success && response.data) {
          setCopperData(response.data);
        } else {
          console.error("Failed to fetch CME copper data:", response.message);
          // No fallback data - show error state
          setCopperData(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching CME copper data:", error);
        // No fallback data - show error state
        setCopperData(null);
      });
  }, []);

  if (!copperData) {
    return null;
  }

  // Extract and format the required values, with fallback to 0.00 if data is invalid
  const copperSpotPrice = copperData.last_price
    ? parseFloat(copperData.last_price).toFixed(4)
    : "0.0000";
  const changePercentage = copperData.price_change_percent
    ? parseFloat(copperData.price_change_percent).toFixed(2)
    : "0.00";
  const change = copperData.price_change
    ? parseFloat(copperData.price_change).toFixed(4)
    : "0.0000";

  // Format the change to display the dollar sign before the negative sign if necessary
  const formattedChange = `${parseFloat(change) > 0 ? "+" + change : change}`;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 mt-4 rounded-lg max-w-3xl">
      {/* Large Screen Layout */}
      <div className="hidden lg:flex flex-row gap-10">
        {/* Copper Spot Price */}
        <div className="text-center lg:text-left">
          <h2 className="text-base font-bold text-white">
            Copper Spot Price
          </h2>
          <p className="text-base mt-1">${copperSpotPrice}</p>
        </div>
        {/* Change in Dollars */}
        <div className="text-center lg:text-left">
          <h2 className="text-base font-bold text-white">Change</h2>
          <p
            className={`text-base mt-1 ${
              parseFloat(change) > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {formattedChange}
          </p>
        </div>
        {/* Change Percentage */}
        <div className="text-center lg:text-left">
          <h2 className="text-base font-bold text-white">% Change</h2>
          <p
            className={`text-base mt-1 ${
              parseFloat(changePercentage) > 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {parseFloat(changePercentage) > 0
              ? `+${changePercentage}%`
              : `${changePercentage}%`}
          </p>
        </div>
      </div>

      {/* Small Screen Layout */}
      <div className="lg:hidden space-y-2">
        <p className="text-base font-bold text-white">
          Copper Spot Price:{" "}
          <span className="font-normal">${copperSpotPrice}</span>
        </p>

        <p className="text-base font-bold text-white">
          Change:{" "}
          <span
            className={`${
              parseFloat(change) > 0 ? "text-green-400" : "text-red-400"
            } font-normal`}
          >
            {formattedChange}
          </span>
        </p>
        <p className="text-base font-bold text-white">
          Change %:{" "}
          <span
            className={`${
              parseFloat(changePercentage) > 0
                ? "text-green-400"
                : "text-red-400"
            } font-normal`}
          >
            {parseFloat(changePercentage) > 0
              ? `+${changePercentage}%`
              : `${changePercentage}%`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PlatinumPrice;