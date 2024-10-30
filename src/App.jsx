import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TourDetail from './Pages/TourDetail/TourDetail';
function App() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '100px' }}>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/tour/:id'
            element={<TourDetail />}
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
