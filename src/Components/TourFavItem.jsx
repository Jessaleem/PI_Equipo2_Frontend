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
    {/* {state.favs ==! [] ?    */}
    <div>
        <div style={{
                display: 'flex',
                height: 'auto',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                margin:'25px 0px'
                }}>
            <div style={{
                    display: 'flex',
                    width: '100%',
                    maxWidth: '800px',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    width: '33.33%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    minHeight: '100px',
                }}>
                    <img
                        src={tourC.image}
                        style={{
                        }}
                        className='h-100 w-100 object-fit-cover' 
                        alt={`Imagen de ${tourC.name}`}
                    />                    
                </div>
            <div 
                style={{
                    display: 'flex',
                    width: '66.66%',
                    flexDirection: 'column',
                    padding: '20px',
                    cursor: 'pointer'
                }}
                onClick = {handleTour}
                >
            <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '10px',
                textAlign:'left',
            }}>{tourC.name}</h2>
            <p style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '20px',
                textAlign:'left',
            }}>
                {tourC.description}
            </p>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <Rating />    
                </div>
            </div>
            <div                
                style={{
                    display: 'flex',
                    width: '8.33%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                }}
                >
                <div
                class="icon-container">
                    <button 
                    class="icon"
                    onClick={addFav} 
                    style={{
                        color: 'white',
                        borderRadius: '50%',
                        padding: '0.5rem',
                        background: 'rgb(0,0,0,0)',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '35px'
                    }}
                    >     
                    {isFav ? 
                    <span 
                    
                    style={{
                        fontSize: '35px',
                    }}>&#10084;</span>
                    :
                    <span style={{
                        fontSize: '35px',
                        fontWeight: 'bold',
                        color: 'black',
                        opacity: '0.5'
                    }}>&#10084;</span>  
                } </button>
                <span class="tooltip1">Quitar de favoritos</span>
                </div>
                

            </div>
        </div>
        </div>


    </div>
    {/* :
    <div><span>No se agregó ningún tour como favorito.</span></div>
    }  */}
    </> 
    )
}

export default TourFavItem