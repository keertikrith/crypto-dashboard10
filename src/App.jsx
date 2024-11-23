// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import DetailsPage from './pages/DetailsPage';
import ExchangesPage from './pages/ExchangesPage';
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}
        <Route
          path="/favorites"
          element={
            <SignedIn>
              <FavoritesPage />
            </SignedIn>
          }
        />
        <Route
          path="/details/:id"
          element={
            <SignedIn>
              <DetailsPage />
            </SignedIn>
          }
        />
        <Route
          path="/exchanges"
          element={
            <SignedIn>
              <ExchangesPage />
            </SignedIn>
          }
        />

        {/* Authentication Routes */}
        <Route
          path="/sign-in"
          element={
            <SignedOut>
              <SignIn />
            </SignedOut>
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignedOut>
              <SignUp />
            </SignedOut>
          }
        />

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
