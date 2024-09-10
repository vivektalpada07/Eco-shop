import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useProductcontext } from "../context/Productcontext";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; // Firestore methods
import CustomerHeader from "./Customerheader"; // Import CustomerHeader

const CustomerOrders = () => {
  const { orders } = useProductcontext(); // Access orders from context
  const { user } = useUserAuth(); // Access authenticated user (customer)
  const [customerOrders, setCustomerOrders] = useState([]); // Store fetched orders
  const [selectedProductForReview, setSelectedProductForReview] = useState(null); // Selected product for review
  const [showReviewModal, setShowReviewModal] = useState(false); // Show the review modal
  const [reviewContent, setReviewContent] = useState(""); // State for review content

  // Fetch customer orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.uid) {
        try {
          console.log("Fetching orders for user:", user.uid); // Debugging log for user UID
          
          // Query the 'checkout' collection for orders of the logged-in customer using `userId`
          const ordersQuery = query(
            collection(db, "checkout"),
            where("userId", "==", user.uid) // Filter by the logged-in user's UID
          );
          const querySnapshot = await getDocs(ordersQuery);
          
          // Debugging log to show the fetched orders
          const userOrders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Fetched Orders:", userOrders); // Log the fetched orders

          setCustomerOrders(userOrders); // Store the fetched orders
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    
    fetchOrders(); // Call the fetch function on component mount
  }, [user]);

  // Handle review submission
  const handleSubmitReview = async () => {
    if (reviewContent.trim()) {
      try {
        if (!selectedProductForReview || !selectedProductForReview.productName) {
          console.error("Product name is missing from the item:", selectedProductForReview);
          alert("Cannot submit review: Product name is missing.");
          return; // Prevent submission if productName is undefined
        }

        await addDoc(collection(db, "reviews"), {
          productName: selectedProductForReview.productName, // Use productName instead of productId
          userId: user.uid, // Track the user who submitted the review
          content: reviewContent,
          customerName: user.displayName || user.email, // Get customer name from user auth context
          createdAt: new Date(),
        });
        alert("Review submitted successfully!");
        setReviewContent(""); // Clear the input field
        setShowReviewModal(false); // Close the modal after submission
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  // Function to trigger review modal for a specific product
  const handleLeaveReview = (item) => {
    console.log("Selected item for review:", item); // Debugging log to check the item structure
    if (!item.productName) {
      console.error("Product name is missing from the item:", item);
      alert("Cannot leave a review for this product: Product name is missing.");
      return; // Prevent showing the modal if productName is missing
    }

    setSelectedProductForReview(item); // Set the product to be reviewed
    setShowReviewModal(true); // Show the review modal
  };

  return (
    <div className="main-content">
      <CustomerHeader /> {/* Add the CustomerHeader here */}
      <h2>My Orders</h2>
      <div className="table-container">
        {customerOrders.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Ordered Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((order, orderIndex) =>
                order.items.map((item, itemIndex) => (
                  <tr key={`${order.id}-${item.productName || itemIndex}`}> {/* Use productName if available */}
                    <td>{order.id}</td>
                    <td>{item.productName}</td>
                    <td>{item.productPrice.toFixed(2)}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.createdAt && order.createdAt.seconds
                        ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {order.status === "complete" && (
                        <Button onClick={() => handleLeaveReview(item)}>
                          Leave Review
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>

      {/* Embedded Review Modal */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review for {selectedProductForReview ? selectedProductForReview.productName : "Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="reviewContent">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="Write your review here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerOrders;
