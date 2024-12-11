import {forwardRef} from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useGeneralContext } from '../context/useGeneralContext';
import logo from '@assets/logo_with_text.svg';
import Avatar from './Avatar';
import ConfirmationModal from './ConfirmationModal';

const Header = forwardRef((props,ref) => {
  console.log(ref)
  const { dispatch, setAbrirModal, state } = useGeneralContext();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const loggedUser = state.isLoggedIn;
  const navigate = useNavigate();

  const openLoginModal = () => {
    dispatch({ type: 'OPEN_LOGIN_MODAL' });
    setAbrirModal(true);
  };

  const linkRegistro = () => {
    navigate('/register');
  };

  const userInformation = state.userData;

  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleLogOut = () => {
    setShowConfirmationModal(false);
    dispatch({ type: 'USER_LOGGED_OUT' });
    dispatch({ type: 'CLOSE_LOGIN_MODAL' });
    localStorage.removeItem('userData');
    dispatch({ type: 'REMOVE_ALL_FAV'})
    // VACIA LISTA DE FAVORITOS
    

  };
  const handleFav = () => {
    navigate('/favorites');
};

  return (
    <header className='fixed-top' ref={ref}>
      <nav
        className='navbar navbar-light px-5'
        style={{ backgroundColor: '#0B4040' }}
      >
        <div className='container-fluid container-navbar'>
          <Link to={`/`}>
            <img
              src={logo}
              alt='logo'
              width='180'
              height='90'
            />
          </Link>

          {loggedUser ? (
            <div className='header-logged-user'>
              {loggedUser && userInformation.type != '3' && (
                <div className='admin-dropdown'>
                  <button
                    className='admin-dropdown-button'
                    onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  >
                    Panel de Administración
                  </button>
                  {showAdminDropdown && (
                    <div className='admin-dropdown-menu'>
                      <Link to='/admin/users'>Lista de usuarios</Link>
                      <Link to='/admin/addProduct'>Agregar producto</Link>
                      <Link to='/admin/tours'>Lista de productos</Link>
                    </div>
                  )}
                </div>
              )}
              <Avatar props={userInformation} />
              <Button
                backgroundColor='#ACF2EB'
                value='Favoritos'                
                onClick={handleFav}
              />
              {/* <Link to='/Favorites'>Favoritos</Link> */}
              <Button
                backgroundColor='#ACF2EB'
                value='Cerrar Sesión'
                onClick={openConfirmationModal}
              />
              <ConfirmationModal
                message='¿Deseas salir de la sesión?'
                onConfirm={handleLogOut}
                onCancel={closeConfirmationModal}
                show={showConfirmationModal}
              />
            </div>
          ) : (
            <section className='header-btn'> 
              <div style={{margin: '0px 30px'}}>
                <Button
                  backgroundColor='#ACF2EB'
                  value='Favoritos' 
                  // className='buttonFav'  
                  // style = {{margin: '0px 30px'}}             
                  onClick={handleFav}
                />
              </div>              
              <Button
                backgroundColor='#ACF2EB'
                value='Registrarse'
                onClick={linkRegistro}
                data-bs-toggle='modal'
                data-bs-target='#loginModal'
              />
              <Button
                backgroundColor='#A7F2CF'
                value='Iniciar Sesión'
                onClick={openLoginModal}
                data-bs-target='#loginModal'
              />
            </section>
          )}
        </div>
      </nav>
    </header>
  );
});

export default Header;
