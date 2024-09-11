import React, { useState } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import Contactusservice from "../context/Contactusservice"; // Adjust import as needed
import Footer from "./Footer";
import HeaderSwitcher from "./HeaderSwitcher";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ error: false, msg: "" });

    if (name === "" || email === "" || subject === "" || message === "") {
      setFeedback({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const contactData = {
      name,
      email,
      subject,
      message
    };

    try {
      await Contactusservice.addContact(contactData);
      setFeedback({ error: false, msg: "Your message has been sent successfully!" });
    } catch (err) {
      console.error("Error sending message:", err); // Log error for debugging
      setFeedback({ error: true, msg: "Failed to send message. Please try again later." });
    }

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="main-content">
    <HeaderSwitcher/>
      <div className="p-4 box">
        {feedback.msg && (
          <Alert
            variant={feedback.error ? "danger" : "success"}
            dismissible
            onClose={() => setFeedback({ error: false, msg: "" })}
          >
            {feedback.msg}
          </Alert>
        )}
        <h2>Contact Us</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formContactName">
            <InputGroup>
              <InputGroup.Text id="formContactName">Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactEmail">
            <InputGroup>
              <InputGroup.Text id="formContactEmail">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactSubject">
            <InputGroup>
              <InputGroup.Text id="formContactSubject">Subject</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactMessage">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="success" type="submit">
              Send Message
            </Button>
          </div>
        </Form>
      </div>
    <Footer/>
    </div>
  );
}

export default ContactUs;
