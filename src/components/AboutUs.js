import Footer from './Footer';
import '../css/AboutUs.css';
import { Container, Row } from 'react-bootstrap';
import HeaderSwitcher from './HeaderSwitcher';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

function AboutUs() {
  const [image, setImage] = useState("");

  // Initialize Firebase Storage
  const storage = getStorage();

  useEffect(() => {
    // Fetch image URL from Firebase Storage
    const fetchImage = async () => {
      try {
        // Create a reference to the file in Firebase Storage
        const imageRef = ref(storage, "images/about us.jpg"); 

        // Get the download URL
        const url = await getDownloadURL(imageRef);

        // Set the image URL to state
        setImage(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className='wrapper'>
      <HeaderSwitcher/>
        <div className='main-content'>
          <Container className='AboutUs'>
            <Row className='Title'>
              <h3>About Us</h3>
            </Row>
            <br/>
            <Row>
              <h5>Discover our Eco Shop</h5>
            </Row>
      
            <Row>
              <p>
                The Eco Shop is a second-hand deal platform where customers can buy as well as sell their products
                <br></br> and the sellers can list their products to sell to the customers. We provide a variety of products 
                <br></br>from different categories such as furniture, homeware and electrical goods. 
                <br></br><br></br>
                Our goal is to provide low priced deals for customers to easily purchase their products without being worried
                <br></br> about the price and affordable to buy.  We provide easy navigation and efficiency for 
                <br></br> both customers and sellers to search, display and manage their products.
              </p>
            </Row>
            {/* Display the fetched image */}
          {image ? (
            <img src={image} alt="AboutUs" className="aboutus-image" />
          ): (
            <p>Loading Image...</p>
          )}
          </Container>
        </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
