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
  const { data } = useQuery({
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

  return (
    <section>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0'
      ></meta>
      <Banner />
      <ToursDestacados />
      <Categorias />
      <Experiencias />
    </section>
  );
};
export default Home;
