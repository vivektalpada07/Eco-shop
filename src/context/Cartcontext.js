import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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
      const existingProduct = cartItems.find(item => item.productId === product.productId);
      
      if (existingProduct) {
        // If product is already in the cart, update the quantity
        const productRef = doc(db, "cart", existingProduct.id);
        await updateDoc(productRef, {
          quantity: existingProduct.quantity ? existingProduct.quantity + 1 : 2 // Update quantity
        });
        
        // Update the cartItems state with the new quantity
        setCartItems(prevCartItems =>
          prevCartItems.map(item =>
            item.productId === product.productId
              ? { ...item, quantity: existingProduct.quantity ? existingProduct.quantity + 1 : 2 }
              : item
          )
        );
      } else {
        // If product is not in the cart, add it as a new entry
        const docRef = await addDoc(collection(db, "cart"), { ...product, quantity: 1 });
        setCartItems(prevCartItems => [...prevCartItems, { id: docRef.id, ...product, quantity: 1 }]);
      }
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
