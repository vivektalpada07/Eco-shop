import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map(doc => ({
          id: doc.id, // Store Firestore document ID as id
          ...doc.data()
        }));
        console.log("Fetched Products:", productsArray);
        setProducts(productsArray);
      } catch (e) {
        console.error("Error fetching products:", e);
      }
    };
  
    fetchProducts();
  }, []);

  function addProduct(product) {
    setProducts((prevProducts) => [...prevProducts, product]);
  }

  function updateProduct(productId, updatedProduct) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product // Compare with id instead of productId
      )
    );
  }

  function deleteProduct(productId) {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId) // Compare with id instead of productId
    );
  }

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductcontext() {
  return useContext(ProductContext);
}
