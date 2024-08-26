import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Furnitures from './components/Furnitures';
import Homewares from './components/Homewares';
import Cart from './components/Cart';
import Electricalgoods from './components/Electricalgoods';
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";  
import { ProductContextProvider } from "./context/Productcontext";
import { CartContextProvider } from "./context/Cartcontext";
import AboutUs from './components/AboutUs';
import ReturnAndRefundPolicy from './components/ReturnRefundPolicy';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <UserAuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/customer" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/Furnitures" element={<Furnitures/>} />
                <Route path="/Homewares" element={<Homewares/>} />
                <Route path="/Electricalgoods" element={<Electricalgoods/>} />
                <Route path="/Cart" element={<Cart/>} />
                <Route path="/return-refund-policy" element={<ReturnAndRefundPolicy/>} />
                <Route path="/contactus" element={<ContactUs/>} />
              </Routes>
            </Col>
          </Row>
        </Container>
        </CartContextProvider>
      </ProductContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
