import React from 'react'
import { useGeneralContext } from '../context/useGeneralContext';

const TourCardN = ({id, tour}) => {
    const { state, dispatch } = useGeneralContext();
    const isFav = state.favs.some((fav) => fav.id == id)
    const addFav = ()=>{
        console.log("boton apretado")
        if (!tour) {
            console.error("El objeto 'tour' es undefined o inválido.");
            return;
        }
        dispatch({type: isFav ? "REMOVE_FAV" : "ADD_FAV", payload: tour})
        }
    return (
        <>
        <div class="tour-card-cat">
            <div class="relative">
            <img src={tour.image} alt={tour.name}/>
            <button class="favorite-button-cat" onClick={addFav}>
                {isFav ? <span>🤍</span>:
                <span>💨</span>
                }
                    {/* <span style={{
                        fontSize: '20px',
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff385c" width="30px" height="30px" class="custom-heart-i" stroke="white" stroke-width="1">
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(0 0 0 / 50%)" width="30px" height="30px" class="custom-heart-i" stroke="white" stroke-width="1">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>                    
                    </span>  
                } */}
            </button>
            <span class="tooltip1">{isFav ? "Quitar de favoritos" : "Agregar a favoritos"}</span>
            
            </div>
            <div class="tour-card-content-cat">
            <h3 class="tour-title-cat">{tour.name}</h3>
            <p class="tour-location-cat">{tour.country}, {tour.city}</p>            
            <div class="price-rating">
                <div class="price">
                ${tour.price}.00 <span>/ persona</span>
                </div>
                <div class="rating">
                    <span class="rating-stars">★★★★★</span>
                    <span class="rating-count">(5.0)</span>
                </div>
            </div>
            <a href={`/tour/${tour.id}`} class="details-button-cat">Ver detalles</a>
            </div>
        </div>
        </>
    )
}

export default TourCardN