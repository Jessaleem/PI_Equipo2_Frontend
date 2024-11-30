import TourCard from './TourCard';
import { useState, useEffect } from 'react';
import { useGeneralContext } from '../context/useGeneralContext';

const ToursDestacados = () => {
  const { state } = useGeneralContext();
  // Estado para almacenar los tours mezclados
  const [displayedTours, setDisplayedTours] = useState([]);

  const tourData = state.tourData;

  useEffect(() => {
    if (tourData.length > 0) {
      // Mezclar los tours solo al montar el componente o cuando 'data' cambia
      const shuffleTours = (array) => array?.sort(() => Math.random() - 0.5);
      setDisplayedTours(shuffleTours(tourData)?.slice(0, 10));
    }
  }, [tourData]);

  return (
    <section className='bg-body-secondary px-3 tourDestacado'>
      {tourData.length > 0 ? (
        <div>
          <div className='tour-grid'>
            {displayedTours?.map((tour) => (
              <TourCard
                key={tour.id}
                imagen={tour.image}
                nombre={tour.name}
                id={tour.id}
                tourC = {tour}
              />
            ))}
          </div>
          <button className='btn ver-mas-btn fw-medium fs-4 px-5 my-5'>
            Ver más
          </button>
        </div>
      ) : (
        <p style={{ padding: 10, color: 'red', fontSize: '20px' }}>
          No se encontraron resultados
        </p>
      )}
    </section>
  );
};

export default ToursDestacados;
