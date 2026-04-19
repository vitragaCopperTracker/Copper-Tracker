import React, { useState, useMemo } from "react";
import { copperAssetsData } from "@/public/static-data/copperAssetsData";

const PAGE_SIZE = 15;

const ICopperAssets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    companyType: "All",
    country: "All",
    stage: "All",
    mineLocation: "All",
    primaryResource: "All",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("Company Name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [hoveredNote, setHoveredNote] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Get unique values for filters
  const uniqueOptions = useMemo(() => {
    return {
      companyType: ["All", ...new Set(copperAssetsData.map(item => item["Company Type"]).filter(Boolean))],
      country: ["All", ...new Set(copperAssetsData.map(item => item["Domiciled"]).filter(Boolean))],
      stage: ["All", ...new Set(copperAssetsData.map(item => item["Company Type"]).filter(Boolean))],
      mineLocation: ["All", ...new Set(copperAssetsData.map(item => item["Mine Location Country"]).filter(Boolean))],
      primaryResource: ["All", ...new Set(copperAssetsData.map(item => item["Primary Assets"]).filter(Boolean))],
    };
  }, []);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = copperAssetsData.filter((asset) => {
      const matchesSearch = 
        asset["Company Name"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset["Ticker"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset["Mine Location Country"]?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters = 
        (filters.companyType === "All" || asset["Company Type"] === filters.companyType) &&
        (filters.country === "All" || asset["Domiciled"] === filters.country) &&
        (filters.stage === "All" || asset["Company Type"] === filters.stage) &&
        (filters.mineLocation === "All" || asset["Mine Location Country"] === filters.mineLocation) &&
        (filters.primaryResource === "All" || asset["Primary Assets"] === filters.primaryResource);

      return matchesSearch && matchesFilters;
    });

    // Sort data
    filtered.sort((a, b) => {
      const aValue = a[sortColumn] || "";
      const bValue = b[sortColumn] || "";
      
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      return sortDirection === "asc" 
        ? aStr.localeCompare(bStr) 
        : bStr.localeCompare(aStr);
    });

    return filtered;
  }, [searchTerm, filters, sortColumn, sortDirection]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSortedData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / PAGE_SIZE);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="py-5">
      <h1 className="cambay text-[22px] sm:text-3xl font-semibold">
        Copper Assets Database 
      </h1>
      
      <div className="mt-1 md:mt-5">
        <div className="w-full bg-accent/10 border border-date/20 p-2 py-4 md:p-8 rounded-lg mb-24">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedData.length} assets
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by company, asset, ticker, or country..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filter Section */}
          <div className="overflow-x-auto pb-2 custom-scrollbar-hidden mb-4">
            <div className="flex gap-x-4 mt-3">
              <div className="min-w-[120px]">
                <label className="block text-xs font-medium text-teal-600 mb-1">COMPANY TYPE</label>
                <select 
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  value={filters.companyType}
                  onChange={(e) => handleFilterChange('companyType', e.target.value)}
                >
                  {uniqueOptions.companyType.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[120px]">
                <label className="block text-xs font-medium text-teal-600 mb-1">COUNTRY</label>
                <select 
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                >
                  {uniqueOptions.country.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[120px]">
                <label className="block text-xs font-medium text-teal-600 mb-1">STAGE</label>
                <select 
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  value={filters.stage}
                  onChange={(e) => handleFilterChange('stage', e.target.value)}
                >
                  {uniqueOptions.stage.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[120px]">
                <label className="block text-xs font-medium text-teal-600 mb-1">MINE LOCATION</label>
                <select 
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  value={filters.mineLocation}
                  onChange={(e) => handleFilterChange('mineLocation', e.target.value)}
                >
                  {uniqueOptions.mineLocation.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[120px]">
                <label className="block text-xs font-medium text-teal-600 mb-1">PRIMARY RESOURCE</label>
                <select 
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  value={filters.primaryResource}
                  onChange={(e) => handleFilterChange('primaryResource', e.target.value)}
                >
                  {uniqueOptions.primaryResource.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto custom-scrollbar-hidden relative">
            <table className="w-full min-w-[1400px] bg-white border rounded-md">
              <thead className="font-bold border-b">
                <tr>
                  <th 
                    className="px-4 py-[15px] text-left text-[11px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('Company Name')}
                  >
                    COMPANY {sortColumn === 'Company Name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-[15px] text-left text-[11px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('Ticker')}
                  >
                    TICKER {sortColumn === 'Ticker' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-[15px] text-left text-[11px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('Stock Exchange')}
                  >
                    ASSET NAME {sortColumn === 'Stock Exchange' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-[15px] text-left text-[11px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('Mine Location Country')}
                  >
                    COUNTRIES {sortColumn === 'Mine Location Country' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-[15px] text-left text-[11px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('Mine Location State/Region')}
                  >
                    STATE/REGION {sortColumn === 'Mine Location State/Region' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-[15px] text-left text-[11px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('Company Type')}
                  >
                    COMPANY TYPE {sortColumn === 'Company Type' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-[15px] text-left text-[11px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('Primary Assets')}
                  >
                    PRIMARY RESOURCE {sortColumn === 'Primary Assets' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-[15px] text-left text-[11px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('Secondary Assets')}
                  >
                    SECONDARY RESOURCE {sortColumn === 'Secondary Assets' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-4 py-[15px] text-left text-[11px] font-semibold uppercase tracking-wider">
                    NOTES
                  </th>
                </tr>
              </thead>
              <tbody className="bg-bg text-lightgray">
                {paginatedData.map((asset, index) => (
                  <tr key={index} className="hover:bg-accent/10 border-b border-date/10 text-[13px]">
                    <td className="px-4 py-[12px] whitespace-nowrap truncate max-w-[200px]" title={asset["Company Name"]}>
                      {asset["Company Name"]}
                    </td>
                    <td className="px-4 py-[12px] font-semibold text-accent">
                      {asset["Ticker"]}
                    </td>
                    <td className="px-4 py-[12px]">
                      {asset["Stock Exchange"] || "N/A"}
                    </td>
                    <td className="px-4 py-[12px]">
                      {asset["Mine Location Country"] || "N/A"}
                    </td>
                    <td className="px-4 py-[12px]">
                      {asset["Mine Location State/Region"] || "N/A"}
                    </td>
                    <td className="px-4 py-[12px]">
                      <span className={`px-2 py-1 rounded text-xs ${
                        asset["Company Type"] === "Producer" ? "bg-green-100 text-green-800" :
                        asset["Company Type"] === "Developer" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {asset["Company Type"] || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-[12px]">
                      {asset["Primary Assets"] || "N/A"}
                    </td>
                    <td className="px-4 py-[12px]">
                      {asset["Secondary Assets"] || "N/A"}
                    </td>
                    <td 
                      className="px-4 py-[12px] max-w-[300px] truncate relative cursor-help"
                      onMouseEnter={(e) => {
                        if (asset["Notes"]) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredNote(asset["Notes"]);
                          setTooltipPosition({
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10
                          });
                        }
                      }}
                      onMouseLeave={() => setHoveredNote(null)}
                    >
                      {asset["Notes"] || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tooltip for Notes */}
          {hoveredNote && (
            <div 
              className="fixed z-50 bg-gray-900 text-white text-sm p-4 rounded-lg shadow-xl max-w-md"
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
                transform: 'translate(-50%, -100%)',
                pointerEvents: 'none'
              }}
            >
              <div className="relative">
                <div className="whitespace-pre-wrap break-words">
                  {hoveredNote}
                </div>
                {/* Arrow pointing down */}
                <div 
                  className="absolute left-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"
                  style={{ transform: 'translateX(-50%)' }}
                />
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, filteredAndSortedData.length)} of {filteredAndSortedData.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                Previous
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, currentPage - 2) + i;
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 text-sm rounded ${
                      pageNum === currentPage 
                        ? 'bg-accent text-white' 
                        : 'border hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICopperAssets;
