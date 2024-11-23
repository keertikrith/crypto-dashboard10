// src/firebase/FavoritesProvider.jsx
import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSetRecoilState } from "recoil";
import { favoritesState } from "../Recoil/atoms";
import { createUserDoc, getUserFavorites } from "./firestoreUtils";
import { toast } from "react-toastify";

const FavoritesProvider = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const setFavorites = useSetRecoilState(favoritesState);

  useEffect(() => {
    const initializeFavorites = async () => {
      if (isSignedIn && user) {
        try {
          // Create user document if it doesn't exist
          await createUserDoc(user.id, user.primaryEmailAddress.emailAddress);

          // Fetch user favorites
          const favorites = await getUserFavorites(user.id);
          setFavorites(favorites);
        } catch (error) {
          console.error("Error initializing favorites:", error);
          toast.error("Failed to load favorites. Please try again.");
        }
      } else {
        // User is signed out; clear favorites
        setFavorites([]);
      }
    };

    initializeFavorites();
  }, [isSignedIn, user, setFavorites]);

  return <>{children}</>;
};

export default FavoritesProvider;
