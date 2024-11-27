import TourCard from "./TourCard";
import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../provider/tours/toursProvider";
import { useState, useEffect } from "react";
const ToursDestacados = () => {
  const { data } = useQuery({
    queryKey: ["tour"],
    queryFn: () => getAllTours(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Estado para almacenar los tours mezclados
  const [displayedTours, setDisplayedTours] = useState([]);

  useEffect(() => {
    if (data) {
      // Mezclar los tours solo al montar el componente o cuando 'data' cambia
      const shuffleTours = (array) => array?.sort(() => Math.random() - 0.5);
      setDisplayedTours(shuffleTours(data)?.slice(0, 10));
    }
  }, [data]);
  return (
    <section className="bg-body-secondary px-3">
      <h2 className="py-5">Tours Destacados</h2>
      <div className="tour-grid">
        {displayedTours?.map((tour) => (
          <TourCard
            key={tour.id}
            imagen={tour.image}
            nombre={tour.name}
            id={tour.id}
          />
        ))}
      </div>
      <button className="btn ver-mas-btn fw-medium fs-4 px-5 my-5">
        Ver más
      </button>
    </section>
  );
};

export default ToursDestacados;
