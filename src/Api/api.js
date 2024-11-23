// src/api/api.js
import axios from "axios";

const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

// Fetch a list of cryptocurrencies
export const fetchCoinsMarkets = (params) => {
  return axios.get(`${COINGECKO_API_BASE}/coins/markets`, { params });
};

// Fetch historical market data for a specific cryptocurrency
export const fetchCoinMarketChart = (id, params) => {
  return axios.get(`${COINGECKO_API_BASE}/coins/${id}/market_chart`, {
    params,
  });
};

// Fetch a list of exchanges
export const fetchExchanges = (params) => {
  return axios.get(`${COINGECKO_API_BASE}/exchanges`, { params });
};

// Fetch detailed information about a specific cryptocurrency
export const fetchCoinDetails = (id) => {
  return axios.get(`${COINGECKO_API_BASE}/coins/${id}`);
};
