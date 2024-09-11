import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase"; // Import storage from your Firebase configuration
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserAuth } from "../context/UserAuthContext";
import Footer from "./Footer";
import HeaderSwitcher from "./HeaderSwitcher";

const BeSeller = () => {
  const [reason, setReason] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useUserAuth();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `sellerImages/${user.uid}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const sellerQuery = {
        reason,
        userId: user.uid,
        userName: user.email,
        submittedAt: new Date(),
        imageUrl, // Include image URL in the document
      };

      await addDoc(collection(db, "sellerQueries"), sellerQuery);
      setReason("");
      setImage(null);
      alert("Your request has been submitted.");
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="main-content">
      <HeaderSwitcher />
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
        <Form.Group controlId="image">
          <Form.Label>Upload ID Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
      <Footer />
    </div>
  );
};

export default BeSeller;
