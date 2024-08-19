import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div>
      <Header />
      <HomePage/>
      <Footer />
    </div>
  );
}

export default Home;
