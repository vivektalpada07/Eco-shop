import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cart"));
        const cartArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCartItems(cartArray);
      } catch (e) {
        console.error("Error fetching cart items:", e);
      }
    };

    fetchCartItems();
  }, []);

  async function addToCart(product) {
    try {
      const docRef = await addDoc(collection(db, "cart"), product);
      setCartItems((prevCartItems) => [...prevCartItems, { id: docRef.id, ...product }]);
    } catch (e) {
      console.error("Error adding to cart:", e);
    }
  }

  async function removeFromCart(productId) {
    try {
      await deleteDoc(doc(db, "cart", productId));
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== productId)
      );
    } catch (e) {
      console.error("Error removing from cart:", e);
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}