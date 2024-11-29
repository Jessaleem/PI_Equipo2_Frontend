import React from "react";
import Rating from "./Rating";
import Experiencias from "./Experiencias";
import { Link } from "react-router-dom";
import TourDetailCaracteristicas from "./TourDetailCaracteristicas";
import { useQuery } from "@tanstack/react-query";
import { getTourById } from "../provider/tours/toursProvider";
import CalendarContainer from "./detailCalendar";
import { useGeneralContext } from "../context/useGeneralContext";
import Swal from "sweetalert2";

const TourDetailSection = ({ id }) => {
  const { state, dispatch } = useGeneralContext();
  const isFav = state.favs.find((fav) => fav.id == id)
  
  const { data } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => getTourById({ tourId: id }),
  });

  const addFav = ()=>{
    dispatch({type: isFav ? "REMOVE_FAV" : "ADD_FAV", payload: data})
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-column justify-content-between gap-2">
        <div className="d-flex  justify-content-start m-2">
          <Link to={"/"}>
            <button className="atras-btn">&lt;- Volver atras</button>
          </Link>
        </div>
        <div className="detail-title-section">
          <h2 className="detail-title"> {data?.name}</h2>
        </div>
      </div>
      <div className="detail-body gap-3 d-flex flex-column justify-content-center">
        <div className="">
          <img
            className="detail-img"
            style={{ maxWidth: "100%" }}
            src={data?.image}
            alt="data-photo"
          />
        </div>
        <div 
          style={{
            alignItems:'center'
          }}
          className="d-flex justify-content-center">
          
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
                        cursor: 'pointer'
                    }}
                    >     
                    {isFav ? 
                    <span style={{
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
                <span class="tooltip1">{isFav ? "Quitar de favoritos" : "Agregar a favoritos"}</span>
                </div>
                
          <Rating />
        </div>
        <div className="d-flex justify-content-center">
          <p className="detail-description">{data?.description}</p>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="reservar-btn">Reservar</button>
      </div>
      <TourDetailCaracteristicas caracteristicas={data?.characteristics} />
      <section>
        <CalendarContainer />
      </section>
      <Experiencias />
      
    </div>
  );
};

export default TourDetailSection;
