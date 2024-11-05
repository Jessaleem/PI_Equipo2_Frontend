import { tours } from '../utils/tours';
import TourCard from './TourCard';

const ToursDestacados = () => {
   // Función para mezclar el arreglo de tours de forma aleatoria
   const shuffleTours = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
    // Mezclamos los tours y seleccionamos los primeros 10 (2 columnas x 5 filas)
    const displayedTours = shuffleTours(tours).slice(0, 10);
  return (
    <div className='bg-body-secondary'>
      <h2 className='py-5'>Tours Destacados</h2>
      <div className='tour-grid'>
        {displayedTours.map((tour) => (
          <TourCard
            key={tour.id}
            imagen={tour.imagen}
            nombre={tour.nombre}
            id={tour.id}
          />
        ))}
      </div>
      <button className='btn ver-mas-btn fw-medium fs-4 px-5 my-5'>
        Ver más
      </button>
    </div>
  );
};

export default ToursDestacados;
