import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import { db } from '../firebase'; // Firestore instance from firebase.js

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  // Fetch all reviews
  const fetchAllReviews = async () => {
    try {
      const reviewsSnapshot = await getDocs(collection(db, 'reviews')); // Fetch all reviews from Firestore
      const allReviews = reviewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(allReviews);
      return allReviews; // Return all reviews for immediate use
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchAllReviews(); // Fetch all reviews when the component mounts
  }, []);

  return (
    <ReviewContext.Provider value={{ reviews, fetchAllReviews }}>
      {children}
    </ReviewContext.Provider>
  );
};
