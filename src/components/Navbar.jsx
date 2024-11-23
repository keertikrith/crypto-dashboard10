// src/components/Navbar.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { themeState, currencyState } from "../Recoil/atoms";
import { SunIcon, MoonIcon } from "@heroicons/react/solid"; // Updated import path for Heroicons v2
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import CurrencySelector from "./CurrencySelector";

const Navbar = ({ onSearch, onSort }) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [currency, setCurrency] = useRecoilState(currencyState);

  // Apply theme on component mount based on saved theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Save to localStorage
    localStorage.setItem("theme", newTheme);
    // Apply to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    localStorage.setItem("currency", e.target.value);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Side: Logo and Links */}
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 dark:text-white"
          >
            Crypto Dashboard
          </Link>
          <Link
            to="/favorites"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            Favorites
          </Link>
          <Link
            to="/exchanges"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            Exchanges
          </Link>
        </div>

        {/* Right Side: Search, Sort, Currency, Theme, Auth */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Cryptos..."
            onChange={(e) => onSearch(e.target.value)}
            className="px-3 py-1 rounded border dark:bg-gray-700 dark:text-white"
          />
          {/* Sort Dropdown */}
          <select
            onChange={(e) => onSort(e.target.value)}
            className="px-3 py-1 rounded border dark:bg-gray-700 dark:text-white"
          >
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="market_cap">Market Cap</option>
            <option value="24h_change">24h Change</option>
          </select>
          {/* Currency Selector */}
          <CurrencySelector />
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="focus:outline-none">
            {theme === "light" ? (
              <MoonIcon className="h-6 w-6 text-gray-800" />
            ) : (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            )}
          </button>
          {/* User Authentication */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              to="/sign-in"
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
