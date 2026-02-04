import React, { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa6";

const DirectHomeCopperPrice = () => {
  const [copperPrices, setCopperPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPricesFromDatabase = async () => {
      try {
        setLoading(true);
        
        // Fetch metal prices from our database API
        const response = await fetch('/api/copper-prices');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success || !data.data || data.data.length === 0) {
          throw new Error('No metal price data available from database');
        }
        
        // Transform database data to component format
        const metalPrices = data.data.map(item => ({
          metal_name: item.metal_name,
          price: parseFloat(item.price),
          price_change: parseFloat(item.price_change),
          price_change_percent: parseFloat(item.price_change_percent),
          source: "Database API"
        }));
        
        setCopperPrices(metalPrices);
        
      } catch (err) {
        console.error('Error fetching prices from database:', err);
        setError(err.message);
        
        // Fallback to mock data
        const fallbackData = [
          {
            metal_name: "Copper",
            price: 4.15,
            price_change: -0.08,
            price_change_percent: -1.89,
            source: "Fallback"
          },
          {
            metal_name: "Aluminum", 
            price: 0.91,
            price_change: -0.02,
            price_change_percent: -1.51,
            source: "Fallback"
          },
          {
            metal_name: "Nickel",
            price: 8.51,
            price_change: -0.16,
            price_change_percent: -2.27,
            source: "Fallback"
          },
          {
            metal_name: "Zinc",
            price: 1.25,
            price_change: -0.02,
            price_change_percent: -1.70,
            source: "Fallback"
          }
        ];
        setCopperPrices(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchPricesFromDatabase();
    
    // Refresh every 2 minutes
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
    <tr className="text-sm hover:bg-accent/10" key={metalData.metal_name}>
      <td className="border-t px-4 py-2 font-sm">
        {metalData.metal_name}
        {metalData.source && (
          <span className="text-xs text-gray-500 ml-2">({metalData.source})</span>
        )}
      </td>
      <td className="border-t px-4 py-3">${formatValue(metalData.price)}</td>
      <td
        className={`border-t px-4 py-3 ${getChangeClass(
          parseFloat(metalData.price_change)
        )}`}
      >
        {metalData.price_change > 0
          ? `$+${formatValue(metalData.price_change)}`
          : metalData.price_change < 0
          ? `$${formatValue(metalData.price_change)}`
          : `$0.0000`}
      </td>
      <td
        className={`border-t px-4 py-3 ${getChangeClass(
          parseFloat(metalData.price_change_percent)
        )}`}
      >
        {formatValue(metalData.price_change_percent)}%
      </td>
      <td className="border-t px-4 py-3 text-center">
        <a
          href={metalData.metal_name === "Copper" 
            ? "/api/copper-prices" 
            : "/api/copper-prices"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/70 hover:text-black/60"
        >
          <FaLink size={18} />
        </a>
      </td>
    </tr>
  );

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading real-time prices...</p>
      </div>
    );
  }

  if (error && copperPrices.length === 0) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error}
        <p className="text-sm text-gray-600 mt-2">Using fallback data</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto custom-scrollbar-hidden">
      <table className="table-auto w-full border-collapse text-sm">
        <thead className="text-left">
          <tr className="text-black/60">
            <th className="border-t px-4 py-2">Metal</th>
            <th className="border-t px-4 py-2">Price (USD/lb)</th>
            <th className="border-t px-4 py-2">Change</th>
            <th className="border-t px-4 py-2">% Change</th>
            <th className="border-t px-4 py-2">Source</th>
          </tr>
        </thead>
        <tbody>{copperPrices.map((metalData) => renderRow(metalData))}</tbody>
      </table>
      
      {error && (
        <div className="mt-2 text-xs text-orange-600 text-center">
          Note: Using fallback data - {error}
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500 text-center">
        Last updated: {new Date().toLocaleTimeString()} • Auto-refresh: 2 min • Source: Database API
      </div>
    </div>
  );
};

export default DirectHomeCopperPrice;