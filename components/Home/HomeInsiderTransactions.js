import React, { useState, useEffect } from "react";

const HomeInsiderTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/insider-transactions/");
        if (!response.ok) {
          throw new Error("Failed to fetch insider transactions");
        }
        const data = await response.json();

        const canadianTransactions = data
          .filter((t) => t.country === "Canada")
          .slice(0, 10);

        setTransactions(canadianTransactions);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching insider transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Return null while loading
  if (loading) return null;

  // Return null if error
  if (error) return null;

  //  Return null if no transactions
  if (transactions.length === 0) return null;

  return (
    <div className="flex flex-col w-full border border-black/10 rounded-xl p-3">
      <h2 className="text-[21px] cambay font-bold mb-2 pb-1">
        Recent Activities
      </h2>
    <div className="overflow-auto md:overflow-scroll 2xl:overflow-visible custom-scrollbar-hidden">
      <table className="table-auto w-full border-collapse text-md ">
        <thead className="text-left ">
          <tr className="text-black/60">
            <th className="border-t px-10 py-2">Country</th>
            <th className="border-t px-10 py-2">Company</th>
            <th className="border-t px-10 py-2">Ticker</th>
            <th className="border-t px-10 py-2">Insider</th>
            <th className="border-t px-10 py-2">Title</th>
            <th className="border-t px-10 py-2">Type</th>
            <th className="border-t px-10 py-2">Price</th>
            <th className="border-t px-10 py-2">Qty</th>
            <th className="border-t px-10 py-2">Amount</th>
            <th className="border-t px-10 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={transaction.id || index}
              className="text-sm hover:bg-accent/10 transition-colors"
            >
              <td className="border-t px-10 py-2">
                <span className="text-lg" title="Canada">
                  🇨🇦
                </span>
              </td>
              <td
                className="border-t py-2 max-w-[120px] truncate"
                title={transaction.company_name}
              >
                {transaction.company_name || "N/A"}
              </td>
              <td className="border-t text-sm px-12 py-2 font-semibold text-accent">
                {transaction.ticker || "N/A"}
              </td>
              <td
                className="border-t py-2 max-w-[100px] truncate"
                title={transaction.insider_name}
              >
                {transaction.insider_name || "N/A"}
              </td>
              <td
                className="border-t px-7 py-2 max-w-[100px] truncate"
                title={transaction.title}
              >
                {transaction.title || "N/A"}
              </td>
              <td className="border-t px-6 py-2">
                {transaction.trade_type || "N/A"}
              </td>
              <td className="border-t px-9 py-2">
                {transaction.price || "$0.00"}
              </td>
              <td className="border-t px-8 py-2 text-green-600 font-medium">
                {transaction.qty || "0"}
              </td>
              <td className="border-t px-8 py-2 text-green-600 font-medium">
                {transaction.value || "$0"}
              </td>
              <td className="border-t px-6 py-2 whitespace-nowrap">
                {formatDate(transaction.transaction_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     </div>
  );
};

export default HomeInsiderTransactions;