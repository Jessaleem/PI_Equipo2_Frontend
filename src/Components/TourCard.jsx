import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useGeneralContext } from '../context/useGeneralContext';

const TourCard = ({ imagen, nombre, id, tourC}) => {
  const { state, dispatch } = useGeneralContext();
  const isFav = state.favs.find((fav) => fav.id == id)
  const addFav = ()=>{
    dispatch({type: isFav ? "REMOVE_FAV" : "ADD_FAV", payload: tourC})
    }
  return (
    <div
      className='tour-card position-relative rounded-2 overflow-hidden'   
    >
      <img
        src={imagen}
        className='h-100 w-100 object-fit-cover' 
        alt={`Imagen de ${nombre}`}
      />
      
      <button onClick={addFav} className="favButton" style={{
        backgroundColor: "rgba(136, 136, 136, 0.116)",
        padding: "10px",
        border: "none",
        width: "100%",
        cursor: "pointer",
      }}>{isFav ? '🌟':'⭐'} </button>
      <div className='position-absolute z-1 bottom-0 w-100 py-3 d-flex flex-column align-items-center gap-2 footer-tourCard-colors'>
        <p className='m-0 text-center text-red-200'>{nombre}</p>
        <Link to={`/tour/${id}`}>
          <button className='w-75 btn py-2 fs-6 fw-bold ver-tourCard-btn-colors'>
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
  tourC: PropTypes.object.isRequired,
};

export default TourCard;
