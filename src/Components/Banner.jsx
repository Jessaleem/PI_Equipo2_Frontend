import Lema from './LemaTextContainer';
import bannerImg from '@assets/banner.png';
import Calendar from './search/Calendar.jsx';
import SearchBar from './search/SearchBar.jsx';
import { useState } from 'react';
import { useGeneralContext } from '../context/useGeneralContext.jsx';
import { useQuery } from '@tanstack/react-query';
import { getAllTours } from '../provider/tours/toursProvider.js';

const Banner = () => {
  const { dispatch } = useGeneralContext();
  const [filterData, setFilterData] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isError } = useQuery({
    queryKey: ['tours', searchTerm],
    queryFn: () => getAllTours({ search: searchTerm }),
    enabled: !!searchTerm,
  });
  const handleSearch = (e) => {
    e.preventDefault();
    if (Array.isArray(data)) dispatch({ type: 'TOUR_DATA', payload: data });
    setSearchTerm('');
  };

  return (
    <div
      className='d-flex flex-column justify-content-center align-items-center gap-4'
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: 'cover', // Ajusta la imagen para cubrir el contenedor
        backgroundPosition: 'center', // Centra la imagen
        backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
        height: '400px',
      }}
    >
      <Lema />
      {/* <div className="position-absolute m-auto end-sm-0 top-sm-0 d-flex align-items-stretch-asdas m-lg-5 gap-4 flex-colum align-content-center"> */}
      <div className='d-flex flex-column flex-lg-row gap-4 me-md-5  me-lg-5'>
        <div>
          <Calendar />
        </div>
        <div className='d-flex gap-2'>
          <SearchBar
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            data={data}
            isError={isError}
          />
          <button
            style={{ height: '40px', width: '50px' }}
            onClick={handleSearch}
            className='btn search py-2 pe-4'
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
