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
          id: doc.id,
          ...doc.data()
        }));
        console.log("Fetched Products:", productsArray); // Debugging line
        setProducts(productsArray);
      } catch (e) {
        console.error("Error fetching products:", e); // Error handling
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
        product.productId === productId ? updatedProduct : product
      )
    );
  }

  function deleteProduct(productId) {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.productId !== productId)
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
