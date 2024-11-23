// src/firebase/firestoreUtils.js
import { db } from "./config";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

/**
 * Create a user document in Firestore.
 * If the user already exists, this function does nothing.
 * @param {string} userId - Unique identifier for the user (from Clerk)
 * @param {string} email - User's email address
 */
export const createUserDoc = async (userId, email) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      email: email,
      favorites: [],
    });
  }
};

/**
 * Get a user's favorites from Firestore.
 * @param {string} userId - Unique identifier for the user (from Clerk)
 * @returns {Array} - Array of favorite cryptocurrency IDs
 */
export const getUserFavorites = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data().favorites || [];
  } else {
    console.warn(`User with ID ${userId} does not exist.`);
    return [];
  }
};

/**
 * Add a cryptocurrency to the user's favorites.
 * @param {string} userId - Unique identifier for the user (from Clerk)
 * @param {string} cryptoId - Cryptocurrency ID to add to favorites
 */
export const addUserFavorite = async (userId, cryptoId) => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {
    favorites: arrayUnion(cryptoId),
  });
};

/**
 * Remove a cryptocurrency from the user's favorites.
 * @param {string} userId - Unique identifier for the user (from Clerk)
 * @param {string} cryptoId - Cryptocurrency ID to remove from favorites
 */
export const removeUserFavorite = async (userId, cryptoId) => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {
    favorites: arrayRemove(cryptoId),
  });
};
