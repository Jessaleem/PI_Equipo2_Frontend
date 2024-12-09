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
      className='tour-card position-relative rounded-2'   
      // className='tour-card position-relative rounded-2 overflow-hidden'   
    >
      
      <div
        class="icon-container"
        style = {{
          zIndex: '2',
          position: 'absolute',
          top: '3px',
          right: '3px',
        }}
        >
            <button 
            class="icon"
            onClick={addFav} 
            style={{
                // color: 'white',
                borderRadius: '50%',
                padding: '0.5rem',
                background: 'rgb(0,0,0,0)',
                border: 'none',
                cursor: 'pointer'
            }}
            >     
            {isFav ? 
            <span style={{
                fontSize: '20px',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff385c" width="30px" height="30px" class="custom-heart" stroke="white" stroke-width="1">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              </span>
            :
            <span style={{
                fontSize: '20px',
                fontWeight: 'bold',
                // color: 'black',
                opacity: ''
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(0 0 0 / 50%)" width="30px" height="30px" class="custom-heart" stroke="white" stroke-width="1.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              
              </span>  
        } </button>
        <span class="tooltip1">{isFav ? "Quitar de favoritos" : "Agregar a favoritos"}</span>
        </div>

{/* 
      <div style={{
        zIndex: '2',
        position: 'absolute',
        top: '3px',
        right: '3px',
      }}>
        <button onClick={addFav} 
          style={{
            color: 'white',
            borderRadius: '50%',
            padding: '0.5rem',
            background: 'rgb(0,0,0,0)',
            border: 'none',
            cursor: 'pointer'
          }}
          >     
          {isFav ? 
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}>&#10084;</span>
          :
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'black',
            opacity: '0.5'
          }}>&#10084;</span>  
          } </button>
        </div> */}
      <img
        src={imagen}
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          zIndex: '1',
        }}
        className='h-100 w-100 object-fit-cover' 
        alt={`Imagen de ${nombre}`}
      />
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
