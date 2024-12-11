import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import { useMutation } from '@tanstack/react-query';

import { useGeneralContext } from "../../context/useGeneralContext";

const ReservationDetail = () => {
  const { state } = useGeneralContext();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  console.log("reservationDetails", state.reservationDetails);

  const mutation = useMutation({
    onError: (error) => {
      if (error.response && error.response.data && error.response.data.message) {
        setRegistrationError(error.response.data.message);
      } else {
        setRegistrationError('Falló en la reserva');
      }
      setIsErrorModalOpen(true);
    },
  });

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setRegistrationError('');
  };

  
  return (
    <div >ReservationDetail</div>
    //<div className='form-container p-0 min-vh-100'>
    //  <p>ReservationDetail</p>
    //  <Modal
    //    isOpen={isErrorModalOpen}
    //    onRequestClose={closeErrorModal}
    //    contentLabel="Error Modal"
    //    className="error-modal error-message"
    //    overlayClassName="error-modal-overlay"
    //  >
    //    <div
    //      className="error-container error-container"
    //    >
    //      <div className="error-icon">✅</div>
    //      <h2>¡La reserva ha sido realizada con exito!</h2>
    //      <button>Cerrar</button>
    //    </div>
    //  </Modal>
//
    //  <Modal
    //    isOpen={isErrorModalOpen}
    //    onRequestClose={closeErrorModal}
    //    contentLabel="Error Modal"
    //    className="error-modal error-message"
    //    overlayClassName="error-modal-overlay"
    //  >
    //    <div
    //      className="error-container error-container"
    //    >
    //      <div className="error-icon ">❌</div>
    //      <h3>Los datos de tu reserva estan incompletos</h3>
    //      <p>
    //        Por favor, asegurate de agregar todos los detalles.
    //      </p>
    //      <button>Cerrar</button>
    //    </div>
    //  </Modal>
    //</div>
  );
};

export default ReservationDetail;
