import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import { useMutation } from '@tanstack/react-query';
import { useGeneralContext } from "../../context/useGeneralContext";
import ReservationContent  from "./ReservationContent"
import { API } from '../../provider/api/api';
import { useNavigate } from 'react-router-dom';


const ReservationDetail = () => {
  const { state,dispatch } = useGeneralContext();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 


  const fechaExperienciaId = state.idSelectedDate;

  const handleReservationConfirmation = async (data, cantidadPersonas) => {
    try {
      const response = await fetch(`${API}/reserva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cantidadPersonas: cantidadPersonas,
          usuarioId: state.userData.id,
          fechaExperienciaId: fechaExperienciaId,
        }),
      });

      if (!response.ok) {
        throw new Error('Falló en la reserva');
      }

      const data = await response.json();
      if (data) {
        setIsSuccessModalOpen(true);
      } else {
        setErrorMessage(data.message || 'Falló en la reserva');
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.message || 'Falló en la reserva');
      setIsErrorModalOpen(true);
    }
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setErrorMessage('');
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/');
  };


  return (
    <div className='form-container p-0 min-vh-100'>
      <ReservationContent onConfirm={handleReservationConfirmation} />
      {
        isSuccessModalOpen && (
          <Modal
          isOpen={isSuccessModalOpen}
          onRequestClose={closeSuccessModal}
          contentLabel="Error Modal"
          className="error-modal error-message"
          overlayClassName="error-modal-overlay"
        >
          <div
            className="error-container error-container"
          >
            <div className="error-icon">✅</div>
            <h2>¡La reserva ha sido realizada con exito!</h2>
            <button onClick={closeSuccessModal}>Cerrar</button>
          </div>
        </Modal>
        )
      }

      {
        isErrorModalOpen && (
          <Modal
            isOpen={isErrorModalOpen}
            onRequestClose={closeErrorModal}
            contentLabel="Error Modal"
            className="error-modal error-message"
            overlayClassName="error-modal-overlay"
          >
            <div
              className="error-container error-container"
            >
              <div className="error-icon ">❌</div>
              <h3>Los datos de tu reserva estan incompletos</h3>
              <p>
                Por favor, asegurate de agregar todos los detalles.
              </p>
              <button onClick={closeErrorModal}>Cerrar</button>
            </div>
          </Modal>
        )
      }
    </div>
  );
};

export default ReservationDetail;
