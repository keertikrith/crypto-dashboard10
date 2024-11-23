// src/pages/DetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoinMarketChart, fetchCoinDetails } from "../Api/api";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useRecoilValue } from "recoil";
import { currencyState } from "../Recoil/atoms";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const DetailsPage = () => {
  const { id } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const currency = useRecoilValue(currencyState);

  useEffect(() => {
    const loadCoinDetails = async () => {
      try {
        // Fetch market chart data for the past 30 days
        const response = await fetchCoinMarketChart(id, {
          vs_currency: currency,
          days: 30,
        });
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching coin market chart:", error);
      }
    };

    const loadCoinInfo = async () => {
      try {
        const response = await fetchCoinDetails(id);
        setCoinDetails(response.data);
      } catch (error) {
        console.error("Error fetching coin details:", error);
      }
    };

    loadCoinDetails();
    loadCoinInfo();
  }, [id, currency]);

  if (!coinDetails || !chartData) {
    return (
      <div className="text-center mt-10 text-gray-800 dark:text-white">
        Loading...
      </div>
    );
  }

  // Prepare data for Chart.js
  const data = {
    labels: chartData.prices.map((price) => new Date(price[0])),
    datasets: [
      {
        label: `${coinDetails.name} Price (${currency.toUpperCase()})`,
        data: chartData.prices.map((price) => price[1]),
        fill: false,
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "day" },
        ticks: { color: "gray" },
      },
      y: {
        ticks: { color: "gray" },
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded shadow p-6">
        {/* Header: Crypto Info */}
        <div className="flex items-center space-x-4">
          <img
            src={coinDetails.image.large}
            alt={coinDetails.name}
            className="w-16 h-16"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {coinDetails.name} ({coinDetails.symbol.toUpperCase()})
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Market Cap: $
              {coinDetails.market_data.market_cap[currency].toLocaleString()}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
