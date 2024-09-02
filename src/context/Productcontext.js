import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

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
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cart")); // Assuming 'cart' is the collection name
        const ordersArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersArray);
      } catch (e) {
        console.error("Error fetching orders:", e);
      }
    };

    fetchProducts();
    fetchOrders();
  }, []);

  async function addProduct(product) {
    try {
      const newProduct = {
        ...product,
        productId: products.length + 1,  // Simulate auto-increment
      };
      const docRef = await addDoc(collection(db, "products"), newProduct);
      setProducts((prevProducts) => [...prevProducts, { id: docRef.id, ...newProduct }]);
    } catch (e) {
      console.error("Error adding product:", e);
    }
  }

  function updateProduct(productId, updatedProduct) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      )
    );
  }

  function deleteProduct(productId) {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  }

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, orders }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductcontext() {
  return useContext(ProductContext);
}
