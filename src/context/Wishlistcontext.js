import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const WishlistContext = createContext();

export function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "wishlist"));
        const wishlistArray = querySnapshot.docs.map(doc => ({
          productId: doc.id,
          ...doc.data(),
        }));
        setWishlist(wishlistArray);
      } catch (e) {
        console.error("Error fetching wishlist:", e);
      }
    };

    fetchWishlist();
  }, []);

  async function removeFromWishlist(productId) {
    try {
      await deleteDoc(doc(db, "wishlist", productId));
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.productId !== productId)
      );
    } catch (e) {
      console.error("Error removing from wishlist:", e);
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  return useContext(WishlistContext);
}
