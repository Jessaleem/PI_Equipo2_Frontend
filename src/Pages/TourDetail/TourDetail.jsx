import { useParams } from 'react-router-dom';

const TourDetail = () => {
  const { id } = useParams();
  return (
    <div className='d-flex flex-column'>
      <div className='d-flex flex-row justify-content-between p-3'>
        <h2 className='text-bs-primary'>Hola</h2>
        <button> atras</button>
      </div>
      <div className='detail-body'>
        <img
          src='#'
          alt='tour-photo'
        />
        <p className='bg-primary'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Necessitatibus, quasi harum adipisci nihil soluta enim magnam cum
          aliquam eos officiis vero itaque aliquid nostrum iusto ullam, incidunt
          a. Corrupti, debitis.
        </p>
      </div>
      <button>Reservar</button>
    </div>
  );
};

export default TourDetail;
