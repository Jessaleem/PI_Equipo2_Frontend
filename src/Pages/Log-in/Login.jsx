
import { useEffect, useState } from 'react';
import { useGeneralContext } from '@context/useGeneralContext';
import { login } from '@services/auth';
import useFetchLogin from './hooks/useFetchLogin';
import Avatar from '../../Components/Avatar';
import avatar from '@assets/avatar.svg';

const LoginModal = () => {
  const { abrirModal, dispatch, state } = useGeneralContext();
  const [loading, setLoading] = useState(false);

  const {  
    handleClose, 
    email, 
    setEmail,
    password, 
    setPassword,
    errorMessage, 
    setErrorMessage,
    handleLoginSubmit
  } = useFetchLogin();
    
  useEffect(() => {
    if (abrirModal && state.isLoginModalOpen) {
      setEmail('');
      setPassword('');
    }
  }, [abrirModal, state.isLoginModalOpen]);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const avatarInfo = {
    image: avatar,
    name: 'Avatar'
  }


  return (
    <>
    <div
      className={`modal fade ${abrirModal && state.isLoginModalOpen ? 'show' : ''}`}
      style={{ 
        display: abrirModal && state.isLoginModalOpen ? 'flex' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1050,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      tabIndex="-1"
      role="dialog"
      id="loginModal"
      aria-hidden="true"
      
    >
      <div
        className="modal-backdrop show"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: -1,
        }}
        onClick={handleBackgroundClick}
      ></div>
      <div className="modal-dialog" role="document" style={{position: 'relative', width: '80%', maxWidth: '400px'}}>
        <div className="modal-content">
          <div className="modal-header" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <h5 className="modal-title">Iniciar Sesión</h5>
            <Avatar props={avatarInfo}/>
          </div>
          <div className="modal-body">
            <form onSubmit={handleLoginSubmit} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft:'20px',  marginRight: '20px'}}>
                <label htmlFor="email" className='form-label'>Correo Electrónico:</label>
                <input 
                  className="form-control"
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Correo Electrónico" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft:'20px', marginRight: '20px'}}>
                <label htmlFor="email" className='form-label'>Contraseña:</label>
                <input 
                  className="form-control"
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              <button 
                type="submit"  
                style={{
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  marginTop: '15px', 
                  backgroundColor: '#A7F2CF', 
                  color: "#0B4040", 
                  border: '1px solid #A7F2CF'
                }} 
                className="btn btn-primary" 
                onClick={handleClose}>
              Ingresar
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    {/* Snackbar (Toast) para mostrar error */}
    {errorMessage && (
        <div
          className="toast show align-items-center text-white bg-danger border-0 position-fixed"
          style={{ 
            bottom: '0vh',
            left: '50vw',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            zIndex: 1060 
          }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              {errorMessage}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              style={{ color: '#721c24' }}
              aria-label="Close"
              onClick={() => setErrorMessage('')}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;

