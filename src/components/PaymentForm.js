import React, { useState } from "react";
import { Form, InputGroup, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../App.css';
import Header from "./Header";
import Footer from "./Footer";
import CheckoutService from "../context/CheckoutServices";
import { useCartContext } from "../context/Cartcontext";

function PaymentForm () {
  const [method, setMethod] = useState("Debit Card");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [country, setCountry] = useState("");
  const [subTotal, setSubTotal] = useState("$0.00");
  const [discount, setDiscount] = useState("$-0.00")
  const [tax, setTax] = useState("$0.00");
  const [totalCost, setTotalCost] = useState("$0.00");
  const {cart} = useCartContext;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (method === "" || name === "" || cardNumber === "" || expDate === "" || cvv === "" || address === "" || city === "" ||
        region === "" || zipCode === "" || country === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newCheckout = {
        method,
        name,
        cardNumber,
        expDate,
        cvv,
        address,
        city,
        region,
        zipCode,
        country,
        discount,
        tax,
        totalCost
      };
      console.log(newCheckout);

      try {
        await CheckoutService.addCheckout(newCheckout);
        setMessage({ error: false, msg: "Your Payment was successful!"});
      } catch (err) {
        setMessage({ error: true, msg: err.message });
      }

      setMethod("");
      setName("");
      setCardNumber("");
      setExpDate("");
      setCVV("");
      setAddress("");
      setCity("");
      setRegion("");
      setZipCode("");
      setCountry("");
      setDiscount("");
      setTax("");
      setTotalCost("");
  };
  
  // This is a navigation hook
  const navigate = useNavigate();

  const handleCheckout = () => {
  navigate('/payment');
  };
  
  const handleNumberChange = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    input = input.substring(0, 16); // Limit to 16 digits
    const formattedNumber = input.replace(/(.{4})/g, "$1 ").trim(); // Add space after every 4 digits
    setCardNumber(formattedNumber);
    };

    const calculateSubTotal = () => {
        const total = cart.reduce((sum, product) => sum + product.price, 0);
        setSubTotal(total.toFixed(2)); // To ensure two decimal places
    };
  return (
    <>
    <div className="wrapper">
    <Header/>
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
    <div className="content">
        <h4>Payment Form</h4>
        <br/>
    <Form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="form-box leftside">
        <Form.Group className="mb-3" controlId="formPaymentMethod">
            <InputGroup>
                <InputGroup.Text id="formPaymentMethod">Select a payment method: </InputGroup.Text>
                <Form.Select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    style={{ width: "100%" }}
                    >
                    <option value="debitCard">Debit Card</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="payPal">PayPal</option>
                </Form.Select>
            </InputGroup>
        </Form.Group>
        <p>Card Details</p>
        <hr/>
        <div className="d-flex justify-content-between">
        <Form.Group className="mb-3 flex-grow-1 me-3" controlId="formCardholderName">
            <InputGroup>
              <InputGroup.Text id="formCardholderName">Cardholder Name </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Cardholder Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%" }}
              />
            </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3 flex-grow-1" controlId="formCardNumber">
            <InputGroup>
              <InputGroup.Text id="formCardNumber">Card Number </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="xxxx xxxx xxxx xxxx"
                value={cardNumber}
                onChange={handleNumberChange}
                style={{ width: "100%" }}
              />
            </InputGroup>
        </Form.Group>
        </div>
        <div className="d-flex justify-content-between">
        <Form.Group className="mb-3 flex-grow-1 me-3" controlId="formExpirationDate">
            <InputGroup>
              <InputGroup.Text id="formExpirationDate">Expiration Date </InputGroup.Text>
              <Form.Control
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                style={{ width: "100%" }}
              />
            </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3 flex-grow-1" controlId="formCVV">
            <InputGroup>
              <InputGroup.Text id="formCVV">CVV </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="xxx"
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
                style={{ width: "100%" }}
              />
            </InputGroup>
        </Form.Group>
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
        </div>
        <div className="form-box rightside">
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
        <div className="text-center mt-3">
            <Button 
                variant="danger" 
                size="lg" 
                className="pay-button"
                type="submit"
                onClick={handleCheckout}
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

export default PaymentForm;
