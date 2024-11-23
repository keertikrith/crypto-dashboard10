// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cryptoListState, currencyState } from "../Recoil/atoms";
import { fetchCoinsMarkets } from "../Api/api";
import CryptoCard from "../components/CryptoCard";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [cryptoList, setCryptoList] = useRecoilState(cryptoListState);
  const currency = useRecoilValue(currencyState);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const response = await fetchCoinsMarkets({
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 250, // Maximum allowed
          page: 1,
          sparkline: false,
        });
        setCryptoList(response.data);
      } catch (error) {
        console.error("Error fetching coins markets:", error);
      }
    };

    loadCoins();
  }, [currency, setCryptoList]);

  // Handle search
  const filteredCoins = cryptoList.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sorting
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (sortOption === "price") {
      return b.current_price - a.current_price;
    } else if (sortOption === "market_cap") {
      return b.market_cap - a.market_cap;
    } else if (sortOption === "24h_change") {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    } else {
      return 0;
    }
  });

  // Handle pagination
  const totalPages = Math.ceil(sortedCoins.length / perPage);
  const paginatedCoins = sortedCoins.slice(
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
          {paginatedCoins.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} />
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

export default HomePage;
