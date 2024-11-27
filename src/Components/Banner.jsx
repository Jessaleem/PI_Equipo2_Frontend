import Lema from './LemaTextContainer';
import bannerImg from '@assets/banner.png';
import Calendar from './search/Calendar.jsx';
import SearchBar from './search/SearchBar.jsx';
import { useState } from 'react';
import { useGeneralContext } from '../context/useGeneralContext.jsx';

const Banner = () => {
  const { dispatch } = useGeneralContext();
  const [filterData, setFilterData] = useState();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'TOUR_DATA', payload: filterData });
  };
  return (
    <div className='max-width-100vw position-relative overflow-hidden d-flex flex-column justify-content-center align-items-center align-items-md-end'>
      <img
        src={bannerImg}
        className='w-100'
      />
      <Lema />
      {/* <div className="position-absolute m-auto end-sm-0 top-sm-0 d-flex align-items-stretch-asdas m-lg-5 gap-4 flex-colum align-content-center"> */}
      <div className='d-flex flex-column flex-lg-row position-absolute gap-4 me-md-5 filtro-busqueda me-lg-5'>
        <div>
          <Calendar />
        </div>
        <div className='d-flex gap-2'>
          <SearchBar setFilterData={setFilterData} />
          <button
            onClick={handleSearch}
            className='btn search py-2 pe-4'
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
