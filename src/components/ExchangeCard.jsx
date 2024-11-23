// src/components/ExchangeCard.jsx
import React from "react";

const ExchangeCard = ({ exchange }) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded shadow p-4 flex items-center space-x-4">
      {/* Exchange Logo */}
      <img src={exchange.image} alt={exchange.name} className="w-12 h-12" />
      {/* Exchange Details */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {exchange.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Volume: ${exchange.trade_volume_24h_btc.toLocaleString()} BTC
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Trust Score: {exchange.trust_score}
        </p>
      </div>
    </div>
  );
};

export default ExchangeCard;
