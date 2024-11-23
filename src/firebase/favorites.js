// src/firebase/favorites.js
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./config";

/**
 * Adds a cryptocurrency ID to the user's favorites.
 * @param {string} userId - The authenticated user's UID.
 * @param {string} coinId - The cryptocurrency ID to add.
 */
export const addFavorite = async (userId, coinId) => {
  const userRef = doc(db, "users", userId);
  await setDoc(
    userRef,
    {
      favorites: arrayUnion(coinId),
    },
    { merge: true }
  );
};

/**
 * Removes a cryptocurrency ID from the user's favorites.
 * @param {string} userId - The authenticated user's UID.
 * @param {string} coinId - The cryptocurrency ID to remove.
 */
export const removeFavorite = async (userId, coinId) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    favorites: arrayRemove(coinId),
  });
};

/**
 * Retrieves the list of favorite cryptocurrency IDs for the user.
 * @param {string} userId - The authenticated user's UID.
 * @returns {Array<string>} - An array of favorite cryptocurrency IDs.
 */
export const getFavorites = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data().favorites || [];
  } else {
    return [];
  }
};
