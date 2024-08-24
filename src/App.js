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
<<<<<<< Updated upstream
import { ProductContextProvider } from "./context/Productcontext"; 
import { CartContextProvider } from "./context/Cartcontext";
=======
import { ProductContextProvider } from "./context/Productcontext";  
>>>>>>> Stashed changes


function App() {
  return (
    <UserAuthContextProvider>
      <ProductContextProvider>
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/customer" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/Furnitures" element={<Furnitures/>} />
                <Route path="/Homewares" element={<Homewares/>} />
                <Route path="/Electricalgoods" element={<Electricalgoods/>} />
<<<<<<< Updated upstream
                <Route path="/cart" element={<Cart />} />

=======
>>>>>>> Stashed changes
              </Routes>
            </Col>
          </Row>
        </Container>
      </ProductContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
