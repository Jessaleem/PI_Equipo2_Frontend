
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useGeneralContext } from '../context/useGeneralContext';
import logo from '@assets/logo_with_text.svg'

const Header = () =>{ 
  const { dispatch, setAbrirModal, state} = useGeneralContext();
  const loggedUser = state.isLoggedIn;
  console.log('state',state)

  const openLoginModal = () => {
    dispatch({ type: 'OPEN_LOGIN_MODAL' })
    setAbrirModal(true);
  }

  const handleLogOut = () => {
    dispatch({ type: 'USER_LOGGED_OUT' })
    dispatch({ type: 'CLOSE_LOGIN_MODAL' })
  } 
   
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

        {loggedUser ? <button onClick={handleLogOut}>Cerrar Sesión</button>:
          <section>
          <Button
            backgroundColor='#ACF2EB'
            value='Registrarse'
            data-bs-toggle="modal" data-bs-target="#loginModal"
          />
          <Button
            backgroundColor='#A7F2CF'
            value='Iniciar Sesión'
            onClick={openLoginModal}
            data-bs-target="#loginModal"
          />
        </section>
        }
      </div>
    </nav>
  </header>
)};

export default Header;
