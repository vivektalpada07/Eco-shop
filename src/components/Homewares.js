import Header from './Header';
import Footer from './Footer';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Homewares = () => {
    return (
        <div className="container-wrapper">
            <Header />

            <div className="content">
                <div className="homewares-container">
                    <h2 className="text-center">Our Homewares Collection</h2>
                    <p className="text-center">
                        Discover our selection of stylish and functional homewares, perfect for enhancing your living space.
                    </p>

                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="card text-center">
                                <img src="cooking_set.jpg" className="card-img-top" alt="Cooking Set" />
                                <div className="card-body">
                                    <h5 className="card-title">Premium Cooking Set</h5>
                                    <p className="card-text">Cook like a pro with this high-quality set of kitchen essentials.</p>
                                    <p className="card-text"><strong>Price: $299</strong></p>
                                    <button className="btn btn-primary">Buy Now</button>
                                    <button className="btn btn-secondary ms-2">Add to Wishlist</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center">
                                <img src="vase.jpg" className="card-img-top" alt="Decorative Vase" />
                                <div className="card-body">
                                    <h5 className="card-title">Decorative Vase</h5>
                                    <p className="card-text">Add a touch of elegance to your home with this beautiful vase.</p>
                                    <p className="card-text"><strong>Price: $89</strong></p>
                                    <button className="btn btn-primary">Buy Now</button>
                                    <button className="btn btn-secondary ms-2">Add to Wishlist</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center">
                                <img src="cushions.jpg" className="card-img-top" alt="Cushion Set" />
                                <div className="card-body">
                                    <h5 className="card-title">Comfort Cushion Set</h5>
                                    <p className="card-text">Relax in style with these comfortable and stylish cushions.</p>
                                    <p className="card-text"><strong>Price: $129</strong></p>
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

export default Homewares;
