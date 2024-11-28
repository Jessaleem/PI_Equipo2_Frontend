import React from "react";
import { useGeneralContext } from "../../context/useGeneralContext";
import TourCard from "../../Components/TourCard";

const Favs = () => {
  const { state } = useGeneralContext();
  return (
    <>
      <div>
          <h1>Tours favoritos</h1>
          <div className="card-grid">
            {state.favs.map((tour) => 
                <TourCard
                  key={tour.id}
                  imagen={tour.image}
                  nombre={tour.name}
                  id={tour.id}
                  tourC = {tour}
                />
                // <TourCard key={tourFavs.id} dentist={tourFavs}/>
            )}        
          </div>
        </div>
    </> 
  );
};

export default Favs;
