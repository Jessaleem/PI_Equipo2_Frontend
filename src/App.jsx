import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TourDetail from './Pages/TourDetail/TourDetail';
import Register from './Pages/form/registro';
import { GeneralProvider } from './context/generalContext';
import LoginModal from './Pages/Log-in/Login';

function App() {
  return (
    <GeneralProvider >
      <Header />
      <LoginModal />
      <div className='body-content'>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/tour/:id'
            element={<TourDetail />}
          />
          <Route 
          path='/register'
          element={<Register/>}/>
        </Routes>
        <Footer />
      </div>
    </GeneralProvider>
  );
}

export default App;
