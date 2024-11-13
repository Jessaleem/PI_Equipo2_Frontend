import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useGeneralContext } from '../context/useGeneralContext';
import logo from '@assets/logo_with_text.svg';
import Avatar from './Avatar';
import ConfirmationModal from './ConfirmationModal';

const Header = () => {
  const { dispatch, setAbrirModal, state } = useGeneralContext();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const loggedUser = state.isLoggedIn;

  const openLoginModal = () => {
    dispatch({ type: 'OPEN_LOGIN_MODAL' });
    setAbrirModal(true);
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
  };

  return (
    <header className='fixed-top'>
      <nav
        className='navbar navbar-light px-5'
        style={{ backgroundColor: '#0B4040' }}
      >
        <div className='container-fluid'>
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
              <Avatar props={userInformation} />
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
            <section>
              <Button
                backgroundColor='#ACF2EB'
                value='Registrarse'
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
      {loggedUser && userInformation.type != '3' && (
        <div
          className='d-flex gap-3 align-items-center p-2'
          style={{ backgroundColor: ' #D9D9D9' }}
        >
          <h2>Admin Panel</h2>
          <nav>
            <div>
              <Link to='/admin/users'>
                <Button
                  backgroundColor='#136060'
                  value='Lista de usuarios'
                />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
