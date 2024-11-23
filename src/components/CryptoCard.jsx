// src/components/CryptoCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { favoritesState, currencyState } from "../Recoil/atoms";
import { StarIcon as SolidStarIcon } from "@heroicons/react/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/outline";
import { useUser } from "@clerk/clerk-react";
import { addUserFavorite, removeUserFavorite } from "../firebase/firestoreUtils";
import { toast } from "react-toastify";

const CryptoCard = ({ coin }) => {
  const { user, isSignedIn } = useUser();
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const currency = useRecoilValue(currencyState);
  const isFavorite = favorites.includes(coin.id);

  const toggleFavorite = async () => {
    if (!isSignedIn || !user) {
      toast.error("Please sign in to manage favorites.");
      return;
    }

    try {
      if (isFavorite) {
        await removeUserFavorite(user.id, coin.id);
        setFavorites(favorites.filter((id) => id !== coin.id));
        toast.success(`${coin.name} removed from favorites.`);
      } else {
        await addUserFavorite(user.id, coin.id);
        setFavorites([...favorites, coin.id]);
        toast.success(`${coin.name} added to favorites.`);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites. Please try again.");
    }
  };

  // Format price using Intl.NumberFormat for correct currency symbol and formatting
  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(coin.current_price);

  // Format 24h change
  const formattedChange = coin.price_change_percentage_24h
    ? coin.price_change_percentage_24h.toFixed(2)
    : "0.00";

  return (
    <div className="bg-white dark:bg-gray-700 rounded shadow p-4 flex justify-between items-center">
      {/* Crypto Info */}
      <Link to={`/details/${coin.id}`} className="flex items-center space-x-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {coin.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 uppercase">
            {coin.symbol}
          </p>
        </div>
      </Link>

      {/* Price and Change */}
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-gray-800 dark:text-white">{formattedPrice}</p>
        </div>
        <div>
          <p
            className={`${
              coin.price_change_percentage_24h >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {formattedChange}%
          </p>
        </div>
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="focus:outline-none"
          aria-label="Toggle Favorite"
        >
          {isFavorite ? (
            <SolidStarIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <OutlineStarIcon className="h-6 w-6 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CryptoCard;
