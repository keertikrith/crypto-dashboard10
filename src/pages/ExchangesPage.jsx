// src/pages/ExchangesPage.jsx
import React, { useEffect, useState } from "react";
import { fetchExchanges } from "../Api/api";
import ExchangeCard from "../components/ExchangeCard";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";

const ExchangesPage = () => {
  const [exchanges, setExchanges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  useEffect(() => {
    const loadExchanges = async () => {
      try {
        const response = await fetchExchanges({
          per_page: 250, // Maximum allowed
          page: 1,
        });
        setExchanges(response.data);
      } catch (error) {
        console.error("Error fetching exchanges:", error);
      }
    };

    loadExchanges();
  }, []);

  // Handle search
  const filteredExchanges = exchanges.filter((exchange) =>
    exchange.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sorting
  const sortedExchanges = [...filteredExchanges].sort((a, b) => {
    if (sortOption === "volume") {
      return b.trade_volume_24h_btc - a.trade_volume_24h_btc;
    } else if (sortOption === "trust_score") {
      return b.trust_score - a.trust_score;
    } else {
      return 0;
    }
  });

  // Handle pagination
  const totalPages = Math.ceil(sortedExchanges.length / perPage);
  const paginatedExchanges = sortedExchanges.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar onSearch={handleSearch} onSort={handleSort} />
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedExchanges.map((exchange) => (
            <ExchangeCard key={exchange.id} exchange={exchange} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ExchangesPage;
