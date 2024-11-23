// src/recoil/atoms.js
import { atom } from "recoil";

// Cryptocurrency list
export const cryptoListState = atom({
  key: "cryptoListState",
  default: [],
});

// Favorites list
export const favoritesState = atom({
  key: "favoritesState",
  default: [],
});

// Theme state (light/dark)
export const themeState = atom({
  key: "themeState",
  default: "light",
});

// Currency state (USD, EUR, GBP, etc.)
export const currencyState = atom({
  key: "currencyState",
  default: "usd",
});
