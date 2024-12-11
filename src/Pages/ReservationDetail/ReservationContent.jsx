import { useGeneralContext } from "@context/useGeneralContext";
import {IconCircleMinus, IconCirclePlus, IconTrash} from '@tabler/icons-react';

const ReservationContent =  () => {

  const { state } = useGeneralContext();
  const reservationDetails = state.reservationDetails;
  const userData = state.userData;
  const {data, dateSelected} = reservationDetails;

  const formattedDate = new Date(dateSelected).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',  height: '80%', gap: '20px'}}>
            <IconCircleMinus style={{marginBottom:'16px'}} />
            <p>1</p>
            <IconCirclePlus style={{marginBottom:'16px'}}/>
          </div>
        </div>
        <div style={{marginTop: 'auto', marginBottom: 'auto'}}>
          <IconTrash />
        </div>

      </section>
      <section className="detalles-reserva-secondary">
        <p style={{fontWeight:'500', marginBottom:'20px'}}>Datos del titular</p>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div className="detalles-reserva-user">
            <p style={{textAlign: 'right'}}>Nombre Completo:</p>
            <p style={{textAlign: 'left'}}>{userData.name}</p>
          </div>
          <div className="detalles-reserva-user">
            <p style={{textAlign: 'right'}}>Correo Electrónico:</p>
            <p style={{textAlign: 'left'}}>{userData.email}</p>
          </div>
        </div>
      </section>
      <button className="reservar-btn" style={{marginTop: 'auto', marginBottom: 'auto'}}>Reservar</button>
      <p>change</p>
    </div>
    
  </div>

  )
}
export default ReservationContent;