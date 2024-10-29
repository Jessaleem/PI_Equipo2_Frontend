import React from 'react';
import Rating from './Rating';
import { dummyData } from '../assets/data/dummyData';

const TourDetailSection = ({ id }) => {
  const tour = dummyData.find((e) => e.id_tour);
  return (
    <div className='d-flex flex-column'>
      <div className='d-flex flex-row justify-content-between p-3'>
        <h2 className='text-bs-primary'>Product: {id}</h2>
        <button className='atras-btn'> atras</button>
      </div>
      <div className='detail-body'>
        <img
          src='#'
          alt='tour-photo'
        />
        <p className='bg-primary'>{tour.descripcion}</p>
        <Rating />
      </div>
      <button className='reservar-btn'>Reservar</button>
    </div>
  );
};

export default TourDetailSection;
