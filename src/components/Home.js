import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import { Button } from "react-bootstrap";
import '../App.css';

function Home() {
  

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default Home;
