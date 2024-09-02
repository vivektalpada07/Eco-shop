import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useProductcontext } from "../context/Productcontext";
import { useUserAuth } from "../context/UserAuthContext";

const Orders = () => {
  const { orders } = useProductcontext();
  const { user } = useUserAuth();
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("Current User UID:", user.uid); // Debugging line
    }

    if (orders.length > 0) {
      console.log("Fetched Orders:", orders); // Debugging line
      const filteredOrders = orders.filter(
        (order) => (order.sellerId || "").trim() === (user.uid || "").trim()
      );
      console.log("Filtered Orders:", filteredOrders); // Debugging line
      setSellerOrders(filteredOrders);
    }
  }, [orders, user]);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {sellerOrders.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
            </tr>
          </thead>
          <tbody>
            {sellerOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
                <td>{order.customerName}</td>
                <td>{order.customerEmail}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No orders found for this seller.</p>
      )}
    </div>
  );
};

export default Orders;

