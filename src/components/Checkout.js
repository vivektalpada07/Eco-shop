import React, { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { useCartContext } from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";
import '../css/Checkout.css';
import '../App.css';

function Checkout() {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [country, setCountry] = useState("");
    const [subTotal, setSubTotal] = useState("0.00");
    const [discount, setDiscount] = useState("");
    const [tax, setTax] = useState("0.00");
    const [totalCost, setTotalCost] = useState("0.00");
    const { cartItems } = useCartContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
    if (discount === "" || address === "" || city === "" || region === "" || zipCode === "" || country === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    }

    // This is a navigation hook
    const navigate = useNavigate();

    const handleCheckout = () => {
    navigate('/customer');
    };

    return (
        <>
            <div className="p-4 box">
                {message?.msg && (
                <Alert
                variant={message?.error ? "danger" : "success"}
                dismissible
                onClose={() => setMessage("")}
                >
                {message?.msg}
                </Alert>
                )}
                <div className="wrapper">
                    <Header/>
                    <div className="content">
                        <h2 className="text-center mb-4">Checkout</h2>
                        <h4>Products History</h4>
                        {cartItems.length > 0 ? (
                        <div className="row justify-content-center">
                            {cartItems.map((item, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card text-center">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.productName}</h5>
                                            <p className="card-text">{item.productDescription}</p>
                                            <p className="card-text"><strong>Price: ${item.productPrice}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        ) : (
                        <p>Your cart is empty.</p>
                        )}
                        <br/>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-container">
                            <div className="form-box">
                        <div className="d-flex align-items-center">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Discount Code"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                />
                            </InputGroup>
                            <Button as="input" type="submit" value="Apply" className="ms-2"/>
                        </div> 
                        <p>Billing Address</p>
                        <hr/>
                        <Form.Group className="mb-3" controlId="formStreetAddress">
                            <InputGroup>
                                <InputGroup.Text id="formStreetAddress">Street Address </InputGroup.Text>
                                <Form.Control
                                type="text"
                                placeholder="Street Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                style={{ width: "100%" }}
                                />
                            </InputGroup>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                        <Form.Group className="mb-3 flex-grow-1 me-3" controlId="formCity">
                            <InputGroup>
                            <InputGroup.Text id="formCity">City </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                style={{ width: "100%" }}
                            />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3 flex-grow-1" controlId="formRegion">
                            <InputGroup>
                            <InputGroup.Text id="formRegion">State/Province/Region </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="State/Province/Region"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                style={{ width: "100%" }}
                            />
                            </InputGroup>
                        </Form.Group>
                        </div>
                        <div className="d-flex justify-content-between">
                        <Form.Group className="mb-3 flex-grow-1 me-3" controlId="formZipCode">
                            <InputGroup>
                            <InputGroup.Text id="formZipCode">Zip/Postal Code </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Zip/Postal Code"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                style={{ width: "100%" }}
                            />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3 flex-grow-1" controlId="formCountry">
                            <InputGroup>
                            <InputGroup.Text id="formCountry">Country </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                style={{ width: "100%" }}
                            />
                            </InputGroup>
                        </Form.Group>
                        </div> 
                        <div className="form-box">
                        <h5 style={{textAlign:'center'}}>Payment Summary</h5>
                        <br/>
                        <div className="mb-3">
                        <div className="align-items">
                            <span className="label">Sub Total:</span> 
                            <span className="value">{subTotal}</span>
                        </div>
                        <div className="align-items">
                            <span className="label">Discount:</span> 
                            <span className="value">{discount}</span>
                        </div>
                        <div className="align-items">
                            <span className="label">Tax:</span> 
                            <span className="value">{tax}</span>
                        </div>
                        <br/>
                        <div className="align-items">
                            <span className="label">Total Cost:</span> 
                            <span className="value">{totalCost}</span>
                        </div>
                        </div>
                        <br/>
                        </div>        
                                <div className="text-center mt-3">
                                    <Button
                                        variant="success" 
                                        size="lg" 
                                        className="checkout-button"
                                        onClick={handleCheckout}
                                    >
                                    Checkout    
                                    </Button>
                                </div>
                        </div>
                        </div>
                    </Form>
                    </div>
                    <Footer/>
                </div> 
                </div>
        </> 
    );
};

export default Checkout;