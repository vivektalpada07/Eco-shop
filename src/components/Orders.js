import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useProductcontext } from "../context/Productcontext";
import { useUserAuth } from "../context/UserAuthContext";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // Firebase Firestore
import SellerHeader from "./SellerHeader"; // Import SellerHeader



const Orders = () => {
  const { orders } = useProductcontext(); // Access orders from context
  const { user } = useUserAuth(); // Access authenticated user (seller)
  const [sellerOrders, setSellerOrders] = useState([]);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false); // State to trigger review prompt

  useEffect(() => {
    if (user && user.uid) {
      const filteredOrders = orders
        .filter(order => order.items.some(item => item.sellerId === user.uid)); // Filter orders for the logged-in seller

      setSellerOrders(filteredOrders);
    }
  }, [orders, user]);

  // Function to update the order status in the 'checkout' collection
  const handleStatusChange = async (orderId, status) => {
    try {
      console.log("Updating status for order in 'checkout' collection. Order ID:", orderId);
      const orderRef = doc(db, "checkout", orderId); // Reference to the order in the 'checkout' collection
      await updateDoc(orderRef, { status }); // Update the order status in Firestore

      if (status === "complete") {
        alert("Order marked as complete. The customer will be prompted to leave a review.");
        setShowReviewPrompt(true); // Trigger the review prompt
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="main-content">
      <SellerHeader />
      <h2>Seller's Orders</h2>
      <div className="table-container">
        {sellerOrders.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sellerOrders.map(order => 
                order.items.map(item => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>{item.productPrice.toFixed(2)}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={e => handleStatusChange(order.id, e.target.value)} // Using 'checkout' collection order ID
                      >
                        <option value="not done">Not Done</option>
                        <option value="in progress">In Progress</option>
                        <option value="delivered">Delivered</option>
                        <option value="complete">Complete</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        ) : (
          <p>No orders found for this seller.</p>
        )}
      </div>

      {showReviewPrompt && (
        <Modal show={showReviewPrompt} onHide={() => setShowReviewPrompt(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Review Request Sent</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            The order has been marked as complete, and the customer has been notified to leave a review.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowReviewPrompt(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
