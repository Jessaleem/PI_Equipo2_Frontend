import React from 'react';
import Rating from './Rating';
import { dummyData } from '@assets/data/dummyData';
import Experiencias from './Experiencias';
import { Link } from 'react-router-dom';

const TourDetailSection = ({ id }) => {
  const tour = dummyData.find((e) => e.id_tour === Number(id));
  return (
    <div className='d-flex flex-column gap-3'>
      <div className='d-flex flex-column justify-content-between gap-2'>
        <div className='d-flex  justify-content-start m-2'>
          <Link to={'/'}>
            <button className='atras-btn'>&lt;- Volver atras</button>
          </Link>
        </div>
        <div className='detail-title-section'>
          <h2 className='detail-title'> {tour.nombre}</h2>
        </div>
      </div>
      <div className='detail-body gap-3 d-flex flex-column justify-content-center'>
        <div className=''>
          <img
            className='detail-img'
            src={tour.imagen}
            alt='tour-photo'
          />
        </div>
        <div className='d-flex justify-content-center'>
          <Rating />
        </div>
        <div className='d-flex justify-content-center'>
          <p className='detail-description'>{tour.descripcion}</p>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <button className='reservar-btn'>Reservar</button>
      </div>
      <Experiencias />
    </div>
  );
};

export default TourDetailSection;
