import React, { useState } from 'react';
import { Button } from '../Button';
import SelectedCalendar from './SelectedCalendar';
import { useGeneralContext } from '../../context/useGeneralContext';
import Swal from 'sweetalert2';

const ReservationModal = ({ show, id, setShow }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { dispatch } = useGeneralContext();
  const handleCancel = (e) => {
    setShow(false);
  };
  const handleConfirm = (e) => {
    if (selectedDate != null) {
      dispatch({
        type: 'RESERVATION_DETAILS',
        payload: { tourId: id, dateSelected: selectedDate },
      });
      setShow(false);
    } else {
      setShow(false);
      Swal.fire({
        text: 'Tienes que seleccionar una fecha válida y disponible',
        timer: 3000,
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0b4040',
      });
    }
  };

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
      role='dialog'
      aria-modal='true'
    >
      <div
        className='modal-dialog'
        role='document'
      >
        <div className='modal-content'>
          <div className='modal-body'>
            <SelectedCalendar
              id={id}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <div style={{ paddingTop: '20px' }}>
              <Button
                backgroundColor='#ACF2EB'
                value='Cancelar'
                type='button'
                className='btn btn-secondary'
                onClick={handleCancel}
              />
              <Button
                backgroundColor='#A7F2CF'
                value='Confirmar'
                type='button'
                className='btn btn-primary'
                onClick={handleConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
