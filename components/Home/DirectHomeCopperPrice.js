import React, { useState, useEffect } from "react";

const DirectHomeCopperPrice = () => {
  const [copperPrices, setCopperPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPricesFromDatabase = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/copper-prices");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success || !data.data) {
          throw new Error("No metal price data available from database");
        }

        const dataArray = Array.isArray(data.data) ? data.data : [data.data];

        if (dataArray.length === 0) {
          throw new Error("No metal price data available from database");
        }

        const metalPrices = dataArray.map((item) => ({
          metal_name: item.metal_name,
          price: parseFloat(item.price),
          price_change: parseFloat(item.price_change),
          price_change_percent: parseFloat(item.price_change_percent),
        }));

        setCopperPrices(metalPrices);
        setError(null);
      } catch (err) {
        console.error("Error fetching prices from database:", err);
        setError(err.message);
        setCopperPrices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPricesFromDatabase();

    const interval = setInterval(fetchPricesFromDatabase, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatValue = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return "0.00";
    }
    return parseFloat(value).toFixed(4);
  };

  const getChangeClass = (value) => {
    if (value > 0) return "text-green-500";
    if (value < 0) return "text-red-500";
    return "text-black";
  };

  const renderRow = (metalData) => (
    <tr className="text-md hover:bg-accent/10" key={metalData.metal_name}>
      <td className="border-t 2xl:pr-24 py-3 font-sm">
        {metalData.metal_name}
      </td>
      <td className="border-t 2xl:pl-24 py-4">
        ${formatValue(metalData.price)}
      </td>
      <td
        className={`border-t 2xl:pl-24 py-3 ${getChangeClass(
          parseFloat(metalData.price_change),
        )}`}
      >
        {metalData.price_change > 0
          ? `$+${formatValue(metalData.price_change)}`
          : metalData.price_change < 0
            ? `${formatValue(metalData.price_change)}`
            : `$0.0000`}
      </td>
      <td
        className={`border-t 2xl:pl-24 py-3 ${getChangeClass(
          parseFloat(metalData.price_change_percent),
        )}`}
      >
        {formatValue(metalData.price_change_percent)}%
      </td>
    </tr>
  );

  // Return null while loading
  if (loading) return null;

  // Return null if error or no data
  if (error || copperPrices.length === 0) return null;

  return (
     <div className="md:col-span-5 xl:col-span-6 bg-white border border-black/10 rounded-lg pt-3 pl-3 pb-2">
    <h2 className="text-[21px] cambay font-bold mb-2">Prices</h2>
    <div className="overflow-x-auto border border-black/10 rounded-xl pl-5 mr-3 pb-2 custom-scrollbar-hidden">
      <table className="table-auto w-full border-collapse text-sm">
        <thead className="text-left">
          <tr className="text-black/60">
            <th className="border-t py-2">Metal</th>
            <th className="border-t 2xl:px-[94px] py-2">Price (USD/lb)</th>
            <th className="border-t 2xl:px-24 py-2">Change</th>
            <th className="border-t 2xl:px-[87px] py-2">% Change</th>
          </tr>
        </thead>
        <tbody>
          {copperPrices.map((metalData) => renderRow(metalData))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default DirectHomeCopperPrice;