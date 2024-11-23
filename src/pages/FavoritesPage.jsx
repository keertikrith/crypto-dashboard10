// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { favoritesState, currencyState } from "../Recoil/atoms";
import CryptoCard from "../components/CryptoCard";
import { fetchCoinsMarkets } from "../Api/api"; // Your API fetching function
import { toast } from "react-toastify"; // For toast notifications

const FavoritesPage = () => {
  const favorites = useRecoilValue(favoritesState);
  const currency = useRecoilValue(currencyState);
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavoriteCoins = async () => {
      if (favorites.length === 0) {
        setFavoriteCoins([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetchCoinsMarkets({
          vs_currency: currency,
          ids: favorites.join(","), // Fetch specific coins
          order: "market_cap_desc",
          per_page: favorites.length,
          page: 1,
          sparkline: false,
        });
        setFavoriteCoins(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching favorite coins:", err);
        setError("Failed to load favorite cryptocurrencies.");
        setLoading(false);
      }
    };

    loadFavoriteCoins();
  }, [favorites, currency]);

  if (loading) {
    return (
      <p className="text-center text-gray-800 dark:text-white">
        Loading favorites...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (favorites.length === 0) {
    return (
      <p className="text-center text-gray-800 dark:text-white">
        No favorites added yet.
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Your Favorites
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteCoins.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
