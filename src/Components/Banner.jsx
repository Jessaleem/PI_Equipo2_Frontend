import Lema from './LemaTextContainer';
import bannerImg from '@assets/banner.png';
import Calendar from './search/Calendar.jsx';
import SearchBar from './search/SearchBar.jsx';
import { useState } from 'react';
import { useGeneralContext } from '../context/useGeneralContext.jsx';
import { useQuery } from '@tanstack/react-query';
import { getAllTours } from '../provider/tours/toursProvider.js';

const parseDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
const Banner = () => {
  const { dispatch } = useGeneralContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [rangeStart, setRangeStart] = useState(null);

  const [rangeEnd, setRangeEnd] = useState(null);

  const { data, isError } = useQuery({
    queryKey: ['tours', searchTerm],
    queryFn: () =>
      getAllTours({
        ...(searchTerm.length > 0 && { search: searchTerm }),
        ...(rangeStart !== null && { startDate: parseDate(rangeStart) }),
        ...(rangeEnd !== null && { endDate: parseDate(rangeEnd) }),
      }),
    enabled: !!searchTerm || rangeStart !== null || rangeEnd !== null,
  });
  const handleSearch = (e) => {
    e.preventDefault();
    if (Array.isArray(data)) {
      dispatch({ type: 'TOUR_DATA', payload: data });
    } else {
      dispatch({ type: 'TOUR_DATA', payload: [] });
    }
    setSearchTerm('');
    setRangeStart(null);
    setRangeEnd(null);
  };

  return (
    <div
      className='d-flex flex-column justify-content-center align-items-center gap-4'
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '500px',
      }}
    >
      <Lema />
      {/* <div className="position-absolute m-auto end-sm-0 top-sm-0 d-flex align-items-stretch-asdas m-lg-5 gap-4 flex-colum align-content-center"> */}
      <div className='w-100 d-flex flex-column gap-3 align-items-center justify-content-center'>
        <div
          style={{ backgroundColor: '#A7F2CF' }}
          className='d-flex flex-column p-3 opacity-75 rounded-1'
        >
          <h3
            style={{ color: '#0A3E42', fontSize: '25px', fontWeight: 'bold' }}
          >
            ¡Encuentra tu siguiente aventura!
          </h3>
          <p style={{ color: ' #0A3E42', fontSize: '20px' }}>
            Encuentra tu próximo destino con nuestra herramienta de búsqueda de
            tours. Desde aventuras en la naturaleza hasta exploraciones urbanas,
            tenemos el tour perfecto para ti
          </p>
        </div>
        <div className='d-flex flex-column flex-lg-row gap-4 me-md-5 me-lg-5 align-items-center justify-content-center full-height'>
          <div>
            <Calendar
              rangeEnd={rangeEnd}
              rangeStart={rangeStart}
              setRangeEnd={setRangeEnd}
              setRangeStart={setRangeStart}
            />
          </div>
          <div
            className='d-flex flex-column justify-content-end'
            style={{ height: '100%' }}
          >
            <div className='d-flex gap-2 align-items-end'>
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
      </div>
    </div>
  );
};

export default Banner;
