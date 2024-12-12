import { useState } from 'react';
import { useGeneralContext } from "@context/useGeneralContext";
import {IconCircleMinus, IconCirclePlus, IconTrash} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const ReservationContent =  ({ onConfirm }) => {
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const { state, dispatch } = useGeneralContext();
  const reservationDetails = state.reservationDetails;
  const userData = state.userData;
  const availableDates = state.availableDates;
  const {data, dateSelected, tourId} = reservationDetails;
  const navigate = useNavigate();

  const dateFound = availableDates.find((availableDate) => {
    const isoAvailableDate = new Date(availableDate.fecha).toISOString().split('T')[0];
    const isoDateSelected = new Date(dateSelected).toISOString().split('T')[0];
    return isoAvailableDate === isoDateSelected;
  });

  
  const availableVacancies = dateFound ? dateFound.cuposRestantes : 10;


  const formattedDate = new Date(dateSelected).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDecrement = () => {
    if (cantidadPersonas > 1) {
      setCantidadPersonas(cantidadPersonas - 1);
    }
  };

  const handleIncrement = () => {
    if (cantidadPersonas < availableVacancies ) {
      setCantidadPersonas(cantidadPersonas + 1);
    }
  };

  const handleDeleteReservation = () => {
    navigate('/');
  }

  const handleReservationBtn = (e) => {
    e.preventDefault();
    dispatch({
      type: 'RESERVATION_DETAILS',
      payload: { tourId, dateSelected, data: data, cantidadPersonas: cantidadPersonas },
    });
    onConfirm(data, cantidadPersonas); // Pasar tourId y cantidadPersonas a la función onConfirm
  };

  return (
  <div style={{marginBottom: '50px'}}>
    <h2 
      style={{
        padding: '10px 0 20px 0'
      }}
    >
      Detalle de tu reserva para {formattedDate} 
    </h2>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px'}}>
      <section className="detalles-reserva-main">
        <div>
          <p style={{fontWeight:'500', marginBottom:'20px'}}>Tour a realizar</p>
          <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <img src={data.image} alt="tour-image" style={{width: '150px', borderRadius: '10px'}}/>
            <div style={{display:'flex', flexDirection:'column'}}>
            <p style={{fontWeight:'500', lineHeight: '1.2', textAlign:'initial'}}>{data.name}</p>
            <span style={{textAlign:'justify', fontSize: '14px'}}>{data.description}</span>
            </div>
            
          </div>
        </div>
        <div>
          <p style={{fontWeight:'500'}}>Valor por persona</p>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%'}}>
          <p style={{fontWeight:'500'}}>${data.price} </p>
          </div>
        </div>
        <div>
          <p style={{fontWeight:'500'}}>Cantidad de personas</p>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',  height: '80%', gap: '10px'}}>
            <IconCircleMinus style={{marginBottom:'16px', cursor: 'pointer', marginRight: '10px'}} onClick={handleDecrement}/>
            <p style={{userSelect: 'none'}}>{cantidadPersonas}</p>
            <IconCirclePlus style={{marginBottom:'16px', cursor: 'pointer', marginLeft: '10px'}} onClick={handleIncrement}/>
          </div>
        </div>
        <div style={{marginTop: 'auto', marginBottom: 'auto'}} onClick={handleDeleteReservation}>
          <IconTrash style={{cursor: 'pointer'}}/>
        </div>

      </section>
      <section className="detalles-reserva-secondary">
        <p style={{fontWeight:'500', marginBottom:'20px', userSelect: 'none'}}>Datos del titular</p>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div className="detalles-reserva-user">
            <p style={{textAlign: 'right', userSelect: 'none'}}>Nombre Completo:</p>
            <p style={{textAlign: 'left', userSelect: 'none'}}>{userData.name}</p>
          </div>
          <div className="detalles-reserva-user">
            <p style={{textAlign: 'right', userSelect: 'none'}}>Correo Electrónico:</p>
            <p style={{textAlign: 'left', userSelect: 'none'}}>{userData.email}</p>
          </div>
        </div>
      </section>
      <button className="reservar-btn" style={{marginTop: 'auto', marginBottom: 'auto'}} onClick={handleReservationBtn}>
        Reservar
      </button>
    </div>
    
  </div>

  )
}
export default ReservationContent;