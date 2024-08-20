import Header from './Header';
import Footer from './Footer';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Furnitures = () => {
  return (
    <div className="container-wrapper">
      <Header />

      <div className="content">
        <div className="furniture-container">
          <h2 className="text-center">Our Furniture Collection</h2>
          <p className="text-center">
            Explore our wide range of stylish and modern furniture, crafted to perfection and designed to bring elegance to your living space.
          </p>

          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card text-center">
                <img src="sofa.jpg" className="card-img-top" alt="Sofa" />
                <div className="card-body">
                  <h5 className="card-title">Elegant Sofa</h5>
                  <p className="card-text">A perfect blend of comfort and style for your living room.</p>
                  <p className="card-text"><strong>Price: $499</strong></p>
                  <button className="btn btn-primary">Buy Now</button>
                  <button className="btn btn-secondary ms-2">Add to Cart</button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center">
                <img src="dining_table.jpg" className="card-img-top" alt="Dining Table" />
                <div className="card-body">
                  <h5 className="card-title">Modern Dining Table</h5>
                  <p className="card-text">Designed for family gatherings, this table combines form and function.</p>
                  <p className="card-text"><strong>Price: $799</strong></p>
                  <button className="btn btn-primary">Buy Now</button>
                  <button className="btn btn-secondary ms-2">Add to Cart</button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center">
                <img src="bed.jpg" className="card-img-top" alt="Bed" />
                <div className="card-body">
                  <h5 className="card-title">Cozy Bed</h5>
                  <p className="card-text">Experience luxury and comfort with our king-sized bed.</p>
                  <p className="card-text"><strong>Price: $999</strong></p>
                  <button className="btn btn-primary">Buy Now</button>
                  <button className="btn btn-secondary ms-2">Add to Cart</button>
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

export default Furnitures;
