import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MOST_FOLLOWED, COPPER_STOCK_DETAIL } from "@/src/api/copperAPI";
import axios from "axios";

const MostFollowedStocksTable = () => {
  const [stocksData, setStocksData] = useState({
    most_watched: [],
    north_american_leaders: [],
    global_market_leaders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchMostFollowedStocks = async () => {
      try {
        setLoading(true);
        console.log("Fetching most followed stocks from:", MOST_FOLLOWED);

        const response = await fetch(MOST_FOLLOWED);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Most followed stocks data:", result);

        if (result.success && result.data) {
          setStocksData(result.data);
        } else {
          // No fallback data - just set empty arrays
          setStocksData({
            most_watched: [],
            north_american_leaders: [],
            global_market_leaders: [],
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching most followed stocks:", err);
        setError(err.message);
        // No fallback data - just set empty arrays
        setStocksData({
          most_watched: [],
          north_american_leaders: [],
          global_market_leaders: [],
        });
        setLoading(false);
      }
    };

    fetchMostFollowedStocks();

    const interval = setInterval(fetchMostFollowedStocks, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const checkSubpageExists = async (stockTicker) => {
    try {
      const response = await axios.get(
        `${COPPER_STOCK_DETAIL}?stock_ticker=${stockTicker}`,
      );
      return response.data.exists ?? true;
    } catch (error) {
      if (!error.response) {
        console.warn("Network error checking subpage, navigating anyway:", error.message);
        return true;
      }
      console.error("Error checking subpage existence:", error);
      return false;
    }
  };

  const handleStockClick = async (stockTicker) => {
    setErrorMessage("");
    const exists = await checkSubpageExists(stockTicker);

    if (exists) {
      router.push(`/stock-detail/${stockTicker}`);
    } else {
      setErrorMessage(`Details for ${stockTicker} are not available.`);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined || isNaN(price)) {
      return "0.00";
    }
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const formatPercentage = (percentage) => {
    if (percentage === null || percentage === undefined || isNaN(percentage)) {
      return "0.00%";
    }
    const value = parseFloat(percentage);
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const getPercentageColor = (percentage) => {
    const value = parseFloat(percentage);
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  const renderStockRow = (stock, index) => (
    <div
      key={stock.id || `${stock.ticker}-${index}`}
      className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
      onClick={() => handleStockClick(stock.ticker?.split(".")[0])}
    >
      <div className="flex-1">
        <div className="font-semibold text-sm text-accent">{stock.ticker}</div>
        <div className="text-xs text-gray-600 mt-0.5">{stock.name}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-gray-900">
          {formatPrice(stock.current_price)}
        </div>
        <div
          className={`text-xs ${getPercentageColor(stock.intraday_percentage)}`}
        >
          {formatPercentage(stock.intraday_percentage)}
        </div>
      </div>
    </div>
  );

  const renderColumn = (stocks, title, subtitle) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-xs text-gray-600">{subtitle}</p>
        <div className="w-8 h-0.5 bg-accent mt-2"></div>
      </div>

      <div className="px-4 py-2 bg-gray-25 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            COMPANY
          </span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            PRICE
          </span>
        </div>
      </div>

      <div className="bg-white max-h-96 overflow-y-auto">
        {stocks.length > 0 ? (
          stocks.map((stock, index) => renderStockRow(stock, index))
        ) : (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            No stocks available
          </div>
        )}
      </div>
    </div>
  );

  //Return null while loading
  if (loading) return null;

  // Return null if error
  if (error) return null;

  // Return null if all stock arrays are empty
  const hasData = 
    stocksData.most_watched.length > 0 || 
    stocksData.north_american_leaders.length > 0 || 
    stocksData.global_market_leaders.length > 0;
  
  if (!hasData) return null;

  return (
    <div className="w-full px-3 md:px-10 lg:px-12 py-6 bg-gray-50">
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-colors"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Stock Not Available
            </h2>
            <p className="text-sm mb-6 text-gray-600">{errorMessage}</p>
            <button
              className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent/90 transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {renderColumn(
            stocksData.most_watched,
            "Most Watched Copper Stocks - Live Performance",
            "Live Performance",
          )}
          {renderColumn(
            stocksData.north_american_leaders,
            "North American Copper Leaders - Market Performance",
            "Market Performance",
          )}
          {renderColumn(
            stocksData.global_market_leaders,
            "Global Copper Market Leaders - Live Tracking",
            "Live Tracking",
          )}
        </div>
      </div>
    </div>
  );
};

export default MostFollowedStocksTable;