// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RecoilRoot } from "recoil";
import { ClerkProvider } from "@clerk/clerk-react";
import FavoritesProvider from "./firebase/FavoritesProvider";
import { themeState, currencyState } from "./Recoil/atoms";
import { useSetRecoilState } from "recoil";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Component to initialize theme and currency from localStorage
 */
const InitializeSettings = ({ children }) => {
  const setTheme = useSetRecoilState(themeState);
  const setCurrency = useSetRecoilState(currencyState);

  React.useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Load currency from localStorage
    const savedCurrency = localStorage.getItem("currency") || "usd";
    setCurrency(savedCurrency);
  }, [setTheme, setCurrency]);

  return children;
};

/**
 * Root component that wraps the app with initialization components
 */
const Root = () => {
  return (
    <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_FRONTEND_API}>
      <RecoilRoot>
        <InitializeSettings>
          <FavoritesProvider>
            <App />
            <ToastContainer />
          </FavoritesProvider>
        </InitializeSettings>
      </RecoilRoot>
    </ClerkProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
