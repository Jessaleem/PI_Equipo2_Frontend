import React from "react";
import { useGeneralContext } from "../../context/useGeneralContext";
import TourCard from "../../Components/TourCard";
import { Link } from "react-router-dom";
import TourFavItem from "../../Components/TourFavItem";

const Favs = () => {
  const { state } = useGeneralContext();
  return (
    <>
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-column justify-content-between gap-2">
        <div className="d-flex  justify-content-start m-2">
          <Link to={"/"}>
            <button className="atras-btn">&lt;- Volver al inicio</button>
          </Link>
        </div>
        <div className="detail-title-section">
          <h2 className="detail-title"> Marcaste como favoritos</h2>
        </div>
      </div>
      {state.favs ==! [] ?   

        <div style={{height: '50vh'}}
        >
          <p style={{fontSize:'30px', marginTop:'50px'}}>No se agregó ningún tour como favorito.</p></div>
        :
        <div className="">
              {state.favs.map((tour) => 
                  <TourFavItem
                    key={tour.id}                  
                    tourC = {tour}
                  />
              )}        
            </div>
      }

    </div>
    </> 
  );
};

export default Favs;
