import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch products and orders from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map(doc => ({
          id: doc.id, // Firestore document ID as the unique product ID
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
        const querySnapshot = await getDocs(collection(db, "checkout"));
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

  // Add a new product
  async function addProduct(product) {
    try {
      const docRef = await addDoc(collection(db, "products"), product); // Add product to Firestore
      const newProduct = {
        id: docRef.id, // Firestore document ID is used as the unique product ID
        ...product,
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (e) {
      console.error("Error adding product:", e);
    }
  }

  // Update product
  function updateProduct(productId, updatedProduct) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      )
    );
  }

  // Delete product by productId
  async function deleteProduct(productId) {
    try {
      await deleteDoc(doc(db, "products", productId)); // Delete product from Firestore
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (e) {
      console.error("Error deleting product:", e);
    }
  }

  // Update order status by orderId
  async function updateOrderStatus(orderId, status) {
    try {
      const orderRef = doc(db, "checkout", orderId);
      await updateDoc(orderRef, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (e) {
      console.error("Error updating order status:", e);
    }
  }

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Hook to use the Product context
export function useProductcontext() {
  return useContext(ProductContext);
}
