import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TourCard = ({ imagen, nombre, id }) => {
  return (
    <div
      className='position-relative rounded-2 overflow-hidden max-width-250px'
      style={{ maxWidth: '250px', minHeight: '334px' }}
    >
      <img
        src={imagen}
        className='h-100 w-100'
      />
      <div className='position-absolute z-1 bottom-0 w-100 py-3 d-flex flex-column align-items-center gap-2 footer-tourCard-colors'>
        <h3 className='m-0'>{nombre}</h3>
        <Link to={`/tour/${id}`}>
          <button className='w-50 btn py-2 fs-5 fw-bold ver-tourCard-btn-colors'>
            Ver
          </button>
        </Link>
      </div>
    </div>
  );
};

TourCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default TourCard;
