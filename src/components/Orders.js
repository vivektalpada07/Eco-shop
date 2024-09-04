import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useProductcontext } from "../context/Productcontext";
import { useUserAuth } from "../context/UserAuthContext";
import HeaderSwitcher from "./HeaderSwitcher";

const Orders = () => {
  const { orders } = useProductcontext();
  const { user } = useUserAuth();
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {
    if (user && user.uid) {
      console.log("Current User UID:", user.uid); // Debugging line

      // Filter orders to only include items sold by the current seller
      const filteredOrders = orders.map((order) => ({
        ...order,
        items: order.items ? order.items.filter((item) => (item.sellerId || "").trim() === (user.uid || "").trim()) : []
      })).filter((order) => order.items.length > 0);

      console.log("Filtered Orders with Seller Items:", filteredOrders); // Debugging line
      setSellerOrders(filteredOrders);
    }
  }, [orders, user]);

  return (
    <div className="main-content">
      <HeaderSwitcher />
      <h2>My Orders</h2>
      {sellerOrders.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Payment ID</th>
              <th>Server Fee</th>
              <th>Address</th>
              <th>Region</th>
              <th>Zip Code</th>
              <th>City</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {sellerOrders.map((order, index) => (
              order.items.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td>{item.productName}</td>
                  <td>{item.productDescription}</td>
                  <td>{item.productPrice}</td>
                  <td>{order.paymentId}</td>
                  <td>{order.serverFee}</td>
                  <td>{order.address}</td>
                  <td>{order.region}</td>
                  <td>{order.zipCode}</td>
                  <td>{order.city}</td>
                  <td>{order.country}</td>
                </tr>
              ))
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
