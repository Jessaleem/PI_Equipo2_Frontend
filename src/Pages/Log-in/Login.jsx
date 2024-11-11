import { useGeneralContext } from '@context/useGeneralContext';

const LoginModal = () => {
  const { abrirModal, setAbrirModal, dispatch, state } = useGeneralContext();

  console.log(state)

  const handleClose = () => {
    setAbrirModal(false);
    dispatch({ type: 'CLOSE_LOGIN_MODAL' });
  };

  return (
    <div
      className={`modal fade ${abrirModal && state.isLoginModalOpen ? 'show' : ''}`}
      style={{ display: abrirModal && state.isLoginModalOpen ? 'block' : 'none' }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Iniciar Sesión</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <p>Aquí van los campos de inicio de sesión...</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cerrar
            </button>
            <button type="button" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

