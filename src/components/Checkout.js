import React, { useState, useEffect } from "react";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import Footer from "./Footer";
import { useCartContext } from "../context/Cartcontext";
import '../css/Checkout.css';
import CheckoutService from "../context/CheckoutServices";
import HeaderSwitcher from "./HeaderSwitcher";

function Checkout() {
    const [discountCode, setDiscountCode] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [country, setCountry] = useState("");
    const [subTotal, setSubTotal] = useState(0.00);
    const [discount, setDiscount] = useState(0.00);
    const [tax, setTax] = useState(0.00);
    const [server, setServer] = useState(0.00);
    const [totalCost, setTotalCost] = useState(0.00);
    const [paymentId, setPaymentId] = useState("");
    const { cartItems } = useCartContext();

    useEffect(() => {
        // Calculate SubTotal when cartItems change
        let subtotal = cartItems.reduce((acc, item) => acc + item.productPrice, 0);
        setSubTotal(subtotal);
    
        // Calculate Tax
        const taxPercentage = 0.30; // Since added a 30% tax
        const taxValue = subtotal * taxPercentage;
        setTax(taxValue);
    
        // Calculate Server Fee
        const serverPercentage = 0.15; // Since added a 15% server fee
        const serverValue = subtotal * serverPercentage;
        setServer(serverValue);
    
        // Calculate Total Cost without discount
        const totalCost = subtotal + taxValue + serverValue;
        setTotalCost(totalCost);
    }, [cartItems]);
    
    const handleApplyDiscount = () => {
        const discountPercentage = 0.20; // Since added a 20% discount
        const discountValue = subTotal * discountPercentage;
        const totalCost = subTotal - discountValue + tax + server;
        
        setDiscount(discountValue);
        setTotalCost(totalCost);
        setDiscountCode('');

        // Set a success message after applying the discount
        setMessage({ error: false, msg: "Discount applied successfully!" });
    };

    const generateUniqueId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (address === "" || city === "" || region === "" || zipCode === "" || country === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }

         // Generate a unique payment ID
         const generatedPaymentId = generateUniqueId();
         setPaymentId(generatedPaymentId);

        const checkoutData = {
            paymentId: generatedPaymentId, // This will be used as both payment ID and document ID
            discountCode,
            address,
            city,
            region,
            zipCode,
            country,
            totalCost: totalCost.toFixed(2)  // Ensure totalCost is sent as a formatted string
        };

        // Log the data to verify
        console.log('Checkout Data:', checkoutData);

        try {
            // Add checkout data to Firestore with the document ID set to the payment ID
            await CheckoutService.addCheckout(checkoutData, generatedPaymentId);
        } catch (err) {
            setMessage({ error: false, msg: err.message });
        }

        setAddress("");
        setCity("");
        setCountry("");
        setRegion("");
        setZipCode("");
        setDiscountCode("");
    };

    return (
        <>
            <div className="p-4 box">
            
                <div className="wrapper">
                    <HeaderSwitcher/>
                    <div className="content">
                            {message?.msg && (
                            <Alert
                                variant={message?.error ? "danger" : "success"}
                                dismissible
                                onClose={() => setMessage("")}
                            >
                                {message?.msg}
                            </Alert>
                        )}
                        <h2 className="text-center mb-4">Checkout</h2>
                        <h4>Products History</h4>
                        {cartItems.length > 0 ? (
                        <div className="row justify-content-center">
                            {cartItems.map((item, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card text-center">
                                    <div className="card-body">
                                        {item.imageUrl && (
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.productName} 
                                                className="card-img-top"
                                            />
                                        )}
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
                        <div className="flex-container">
                            <InputGroup className="input-width">
                                <Form.Control
                                    type="text"
                                    placeholder="Discount Code"
                                    maxLength={8}
                                    value={discountCode} // Set the value to discountCode to clear the input field
                                    onChange={(e) => setDiscountCode(e.target.value)} 
                                />
                            </InputGroup>
                            <Button
                                    variant="success" 
                                    size="md" 
                                    className="apply-button"
                                    onClick={handleApplyDiscount}
                                    >
                                    Apply    
                            </Button>
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
                            <span className="value">${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="align-items">
                            <span className="label">Discount (20%):</span> 
                            <span className="value">$-{discount.toFixed(2)}</span>
                        </div>
                        <div className="align-items">
                            <span className="label">Tax (30%):</span> 
                            <span className="value">${tax.toFixed(2)}</span>
                        </div>
                        <div className="align-items">
                            <span className="label">Server Fee (15%):</span> 
                            <span className="value">${server.toFixed(2)}</span>
                        </div>
                        <br/>
                        <div className="align-items">
                            <span className="label">Total Cost:</span> 
                            <span className="value">${totalCost.toFixed(2)}</span>
                        </div>
                        </div>
                        <br/>
                        </div>        
                                <div className="text-center mt-3">
                                    <Button
                                        variant="success" 
                                        size="lg" 
                                        className="checkout-button"
                                        type="submit"
                                    >
                                    Pay Now    
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
