import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import Header from "./Header";
import Footer from "./Footer";
import FBDataService from "../context/FBService"; // Assuming you have a service to fetch user data

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleRoleBasedRedirect = async (uid) => {
    const userDoc = await FBDataService.getData(uid);
    if (userDoc.exists) {
      const userRole = userDoc.data().role;
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "seller") {
        navigate("/seller");
      } else if (userRole === "customer") {
        navigate("/customer");
      } else {
        setError("Role not recognized.");
      }
    } else {
      setError("User data not found.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await logIn(email, password);
      await handleRoleBasedRedirect(userCredential.user.uid);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await googleSignIn();
      await handleRoleBasedRedirect(userCredential.user.uid);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="image-section">
          <img src="/path-to-your-image.jpg" alt="Login" className="login-image" />
        </div>
        <div className="form-section">
          <div className="p-4 box">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                  Log In
                </Button>
              </div>
            </Form>
            <hr />
            <div>
              <GoogleButton
                className="g-btn"
                type="dark"
                onClick={handleGoogleSignIn}
              />
            </div>
            <div className="p-4 box mt-3 text-center">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
