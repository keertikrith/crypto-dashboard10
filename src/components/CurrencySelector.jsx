// src/components/CurrencySelector.jsx
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currencyState } from "../Recoil/atoms";

const CurrencySelector = () => {
  const [currency, setCurrency] = useRecoilState(currencyState);

  // Optional: Persist currency selection using localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, [setCurrency]);

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    localStorage.setItem("selectedCurrency", selectedCurrency); // Save to localStorage
  };

  return (
    <select
      value={currency}
      onChange={handleCurrencyChange}
      className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
    >
      <option value="usd">USD</option>
      <option value="eur">EUR</option>
      <option value="gbp">GBP</option>
      <option value="jpy">JPY</option>
      <option value="inr">INR</option>
      <option value="aud">AUD</option>
      <option value="cad">CAD</option>
      <option value="chf">CHF</option>
      <option value="cny">CNY</option>
      <option value="sek">SEK</option>
      {/* Add more currencies as needed */}
    </select>
  );
};

export default CurrencySelector;
