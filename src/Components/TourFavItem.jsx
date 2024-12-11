import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useGeneralContext } from '../context/useGeneralContext';
import Rating from './Rating';
import Swal from 'sweetalert2';

const TourFavItem = ({tourC}) => {
    const { state, dispatch } = useGeneralContext();
    const isFav = state.favs.find((fav) => fav.id == tourC.id)
    const navigate = useNavigate();
    const handleTour = () => {
        navigate(`/tour/${tourC.id}`);
    };
    const addFav = ()=>{
    dispatch({type: isFav ? "REMOVE_FAV" : "ADD_FAV", payload: tourC})
    Swal.fire({
        // icon: "success",
        title: "Se eliminó de tus favoritos",
        // text: "Eliminado de tus favoritos",
        // confirmButtonText: "Aceptar",
    });
    }
    return (
    <>
    <div>
        <div className="tour-card-container" >
            <div className='tour-card-f'>
                <div className='tour-card-image'>
                    <img
                        src={tourC.image}
                        className='tour-card-img'
                        alt={`Imagen de ${tourC.name}`}
                    />                    
                </div>
            <div className='tour-card-content' onClick = {handleTour}>
                <h2 className='tour-card-title'>{tourC.name}</h2>
                <p className='tour-card-description'>{tourC.description}</p>
                <div className='tour-card-rating'><Rating /></div>
            </div>
            <div className='tour-card-favorite'>
                <div class="icon-container">
                    <button class="icon" onClick={addFav}>     
                    {isFav ? 
                        (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff385c" class="custom-heart" stroke="white" stroke-width="1">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>)
                    :                    
                        (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(0 0 0 / 50%)" class="custom-heart" stroke="white" stroke-width="1.5">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>)                        
                } </button>
                <span class="tooltip1">Quitar de favoritos</span>
                </div>
            </div>
        </div>
        </div>
    </div>
    </> 
    )
}

export default TourFavItem