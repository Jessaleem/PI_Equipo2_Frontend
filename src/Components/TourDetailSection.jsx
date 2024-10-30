import React from 'react';
import Rating from './Rating';
import { dummyData } from '@assets/data/dummyData';

const TourDetailSection = ({ id }) => {
  const tour = dummyData.find((e) => e.id_tour === Number(id));
  console.log(tour, id);
  return (
    <div className='d-flex flex-column gap-3'>
      <div className='d-flex flex-column justify-content-between gap-2'>
        <div className='d-flex  justify-content-start m-2'>
          <button className='atras-btn'> Volver atras</button>
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
    </div>
  );
};

export default TourDetailSection;
