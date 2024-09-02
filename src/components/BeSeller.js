import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useUserAuth } from "../context/UserAuthContext";
import Header from "./Header";
import Footer from "./Footer";

const BeSeller = () => {
  const [reason, setReason] = useState("");
  const { user } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sellerQuery = {
        reason,
        userId: user.uid,
        userName: user.email,
        submittedAt: new Date(),
      };

      await addDoc(collection(db, "sellerQueries"), sellerQuery);
      setReason("");
      alert("Your request has been submitted.");
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="seller-container">
      <Header/>
      <h2>Become a Seller</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reason">
          <Form.Label>Why do you want to be a seller?</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Footer/>
    </div>
  );
};

export default BeSeller;
