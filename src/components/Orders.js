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
    <div className="main-content">
      <HeaderSwitcher/>
      <h2>My Orders</h2>
      {sellerOrders.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Cost</th>
              <th>Payment ID</th>
              <th>Region</th>
              <th>Zip Code</th>
              <th>Server Fee</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {sellerOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.items[0]?.productName}</td>
                <td>{order.items[0]?.productDescription}</td>
                <td>{order.items[0]?.productPrice}</td>
                <td>{order.items.length}</td> {/* Assuming quantity is the number of items */}
                <td>{order.totalCost}</td>
                <td>{order.paymentId}</td>
                <td>{order.region}</td>
                <td>{order.zipCode}</td>
                <td>{order.serverFee}</td>
                <td>{order.address}</td>
                <td>{order.city}</td>
                <td>{order.country}</td>
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
