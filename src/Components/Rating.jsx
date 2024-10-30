import React from 'react';

const Rating = () => {
  return (
    <div>
      <div className='rating'>
        <i
          className='fa-solid fa-star selected'
          data-value='1'
        ></i>
        <i
          className='fa-solid fa-star selected'
          data-value='2'
        ></i>
        <i
          className='fa-solid fa-star selected'
          data-value='3'
        ></i>
        <i
          className='fa-solid fa-star selected'
          data-value='4'
        ></i>
        <i
          className='fa-solid fa-star'
          data-value='5'
        ></i>
      </div>
    </div>
  );
};

export default Rating;
