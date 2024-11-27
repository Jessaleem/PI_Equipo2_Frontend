import { useQuery } from '@tanstack/react-query';
import Banner from '../../Components/Banner';
import Categorias from '../../Components/Categorias';
import Experiencias from '../../Components/Experiencias';
import ToursDestacados from '../../Components/ToursDestacados';
import { useGeneralContext } from '../../context/useGeneralContext';
import { useEffect } from 'react';
import { getAllTours } from '../../provider/tours/toursProvider';

const Home = () => {
  const { dispatch } = useGeneralContext();
  const { data, refetch } = useQuery({
    queryKey: ['tour'],
    queryFn: () => getAllTours(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: 'TOUR_DATA', payload: data });
    }
  }, [dispatch, data]);

  const handleTourDestacado = (e) => {
    e.preventDefault();
    refetch();
  };
  return (
    <section>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0'
      ></meta>
      <Banner />
      <div className='bg-body-secondary p-3 mb-2 z-1'>
        <button
          onClick={handleTourDestacado}
          className='px-2 fs-2 fw-bold  bg-transparent'
          style={{
            color: '#0b4040',
            border: '2px solid #0b4040',
            borderRadius: '10px',
          }}
        >
          Tours Destacados
        </button>
        <ToursDestacados />
      </div>
      <Categorias />
      <Experiencias />
    </section>
  );
};
export default Home;
