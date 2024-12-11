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

import UserList from './Pages/admin/userList/UserList';
import AddProduct from './Pages/admin/addProduct/AddProduct';
import ToursList from './Pages/admin/tour/ToursList';
import Favs from './Pages/favs/Favs';
import PageCategoriaProductos from './Components/PageCategoriaProductos';
import ReservationDetail from './Pages/ReservationDetail/ReservationDetail';

function App() {
  return (
    <GeneralProvider>
      <Header />
      <LoginModal />
      <div
        className='body-content'
        style={{ paddingTop: '100px' }}
      >
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
            element={<Register />}
          />
          <Route
            path='/admin/users'
            element={<UserList />}
          />
          <Route
            path='/admin/addProduct'
            element={<AddProduct />}
          />
          <Route
            path='/admin/tours'
            element={<ToursList />}
          />
          <Route
            path='/categoria/:categoria'
            element={<PageCategoriaProductos />}
          />
          <Route
            path='/favorites'
            element={<Favs />}
          />
          <Route
            path='/reservationDetail'
            element={<ReservationDetail />}
          />
        </Routes>
        <Footer />
      </div>
    </GeneralProvider>
  );
}

export default App;
