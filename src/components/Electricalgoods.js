import Header from './Header';
import Footer from './Footer';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Electricalgoods = () => {
  return (
    <div className="container-wrapper">
      <Header />

      <div className="content">
        <div className="electricalgoods-container">
          <h2 className="text-center">Our Electrical Goods Collection</h2>
          <p className="text-center">
            Browse our range of top-quality electrical goods, designed to meet all your household needs.
          </p>

          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card text-center">
                <img src="tv.jpg" className="card-img-top" alt="Smart TV" />
                <div className="card-body">
                  <h5 className="card-title">4K Smart TV</h5>
                  <p className="card-text">Experience entertainment like never before with our latest 4K Smart TV.</p>
                  <p className="card-text"><strong>Price: $899</strong></p>
                  <button className="btn btn-primary">Buy Now</button>
                  <button className="btn btn-secondary ms-2">Add to Wishlist</button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center">
                <img src="microwave.jpg" className="card-img-top" alt="Microwave Oven" />
                <div className="card-body">
                  <h5 className="card-title">Microwave Oven</h5>
                  <p className="card-text">Quick and easy cooking with our high-performance microwave oven.</p>
                  <p className="card-text"><strong>Price: $199</strong></p>
                  <button className="btn btn-primary">Buy Now</button>
                  <button className="btn btn-secondary ms-2">Add to Wishlist</button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center">
                <img src="blender.jpg" className="card-img-top" alt="Blender" />
                <div className="card-body">
                  <h5 className="card-title">High-Speed Blender</h5>
                  <p className="card-text">Perfect for smoothies, soups, and more with this powerful blender.</p>
                  <p className="card-text"><strong>Price: $149</strong></p>
                  <button className="btn btn-primary">Buy Now</button>
                  <button className="btn btn-secondary ms-2">Add to Wishlist</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Electricalgoods;
