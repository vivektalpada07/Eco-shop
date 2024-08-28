import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { useCartContext } from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const [discount, setDiscount] = useState("");
    const { cartItems } = useCartContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    // This is a navigation hook
    const navigate = useNavigate();

    const handleCheckout = () => {
    navigate('/payment');
    };

    return (
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
            <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
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
                <div className="text-center mt-3">
                    <Button
                        variant="success" 
                        size="lg" 
                        className="payment-button"
                        onClick={handleCheckout}
                    >
                    Proceed To Pay    
                    </Button>
                </div>
            </Form>
            </div>
            <Footer/>
        </div>  
    );
};

export default Checkout;