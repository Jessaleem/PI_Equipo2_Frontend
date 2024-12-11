import React, { useState, useEffect  } from 'react';
import Rating from './Rating';
import Experiencias from './Experiencias';
import { Link, useNavigate } from 'react-router-dom';
import TourDetailCaracteristicas from './TourDetailCaracteristicas';
import { useQuery } from '@tanstack/react-query';
import { getTourById } from '../provider/tours/toursProvider';
import CalendarContainer from './detailCalendar';
import { useGeneralContext } from '../context/useGeneralContext';
import ReservationModal from './reservation/ReservationModal';
import Swal from 'sweetalert2';

const TourDetailSection = ({ id }) => {
  useEffect(() => {
    // Desplazar al top cuando se accede al detalle del tour
    window.scrollTo(0, 0);
  }, []); // [] asegura que solo se ejecute una vez al montar el componente
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { state, dispatch } = useGeneralContext();
  const isFav = state.favs.find((fav) => fav.id == id);
  const user = state.userData;
  const { data } = useQuery({
    queryKey: ['tour', id],
    queryFn: () => getTourById({ tourId: id }),
  });

  const addFav = () => {
    dispatch({ type: isFav ? 'REMOVE_FAV' : 'ADD_FAV', payload: data });
  };

  const handleReservationBtn = (e) => {
    if (user.id) {
      setShow(true);
    } else {
      Swal.fire({
        icon: 'info',
        text: 'Tienes que ser usuario registrado para realizar una reserva',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0b4040',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/register');
        }
      });
    }
  };
  return (
    <div className='d-flex flex-column gap-3'>
      <div className='d-flex flex-column justify-content-between gap-2'>
        <div className='d-flex  justify-content-start m-2'>
          <Link to={'/'}>
            <button className='atras-btn'>&lt;- Volver atras</button>
          </Link>
        </div>
        <div className='detail-title-section'>
          <h2 className='detail-title'> {data?.name}</h2>
        </div>
      </div>
      <div className='detail-body gap-3 d-flex flex-column justify-content-center'>
        <div className=''>
          <img
            className='detail-img'
            src={data?.image}
            alt='data-photo'
          />
        </div>
        <div
          style={{
            alignItems: 'center',
          }}
          className='d-flex justify-content-center'
        >
          <div className='icon-container'>
            <button
              className='icon'
              onClick={addFav}
              style={{
                color: 'white',
                borderRadius: '50%',
                padding: '0.5rem',
                background: 'rgb(0,0,0,0)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isFav ? (
                <span
                  style={{
                    fontSize: '35px',
                  }}
                >
                  &#10084;
                </span>
              ) : (
                <span
                  style={{
                    fontSize: '35px',
                    fontWeight: 'bold',
                    color: 'black',
                    opacity: '0.5',
                  }}
                >
                  &#10084;
                </span>
              )}{' '}
            </button>
            <span className='tooltip1'>
              {isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </span>
          </div>

          <Rating />
        </div>
        <div className='d-flex justify-content-center'>
          <p className='detail-description'>{data?.description}</p>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <button
          className='reservar-btn'
          onClick={handleReservationBtn}
        >
          Reservar
        </button>
      </div>
      <ReservationModal
        id={id}
        show={show}
        setShow={setShow}
        navigate={navigate}
      />
      <TourDetailCaracteristicas caracteristicas={data?.characteristics} />
      <section>
        <CalendarContainer id={id} />
      </section>
      <section className='extraInfo w-max-1280'>
        <h2 className='my-5'>Infomacion Adicional</h2>
        <div className='w-100 p-3'>
          <section className='mx-auto  border-2 border-danger text-start d-flex flex-column row-gap-4 flex-wrap justify-content-between'>
            <p className='m-0 fs-5 border-2 border-warning'>
              <b>Ciudad:</b> {data?.city}
            </p>
            <p className='m-0 fs-5 border-2 border-warning'>
              <b>Pais:</b> {data?.country}
            </p>
            <p className='m-0 fs-5 border-2 border-warning'>
              <b>Categoria:</b> {data?.category.name}
            </p>
            <p className='m-0 fs-5 border-2 border-warning'>
              <b>Precio:</b> {data?.price}
            </p>
            <p className='m-0 fs-5 border-2 border-warning'>
              <b>Cupos:</b> {data?.slots}
            </p>
            <p className='m-0 fs-5 border-2 border-warning'>
              <b>Apto para niños:</b> {data?.suitableForChildren ? 'SI' : 'NO'}
            </p>
            <p className='m-0 fs-5 border-2 border-warning'>
              <b>Recomendaciones:</b> {data?.recommendations}
            </p>
          </section>
        </div>
      </section>
      <Experiencias />
    </div>
  );
};

export default TourDetailSection;
