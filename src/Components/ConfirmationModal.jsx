import { Button } from "./Button";

const ConfirmationModal = ({  message, onConfirm, onCancel, show }) => {
    return (
      <div
        className={`modal fade ${show ? 'show' : ''}`}
        style={{
          display: show ? 'flex' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1050,
        }}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h4 style={{paddingTop: '20px'}}>{message}</h4>
              <div style={{paddingTop: '20px'}}>
              <Button backgroundColor='#ACF2EB' value='Cancelar' type="button" className="btn btn-secondary" onClick={onCancel} />            
              <Button backgroundColor='#A7F2CF' value='Confirmar' type="button" className="btn btn-primary" onClick={onConfirm} />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;