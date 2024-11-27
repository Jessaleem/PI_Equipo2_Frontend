import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { updateTourCategory } from '../../provider/tours/toursProvider';
import { getCategory } from '../../provider/category/categoryProvider';

const TourListRow = ({ tour }) => {
  const [tourId, setTourId] = useState();
  const [categoryId, setCategoryId] = useState();

  const handleTypeChange = (tourId, selectCategoryId) => {
    setTourId(tourId);
    setCategoryId(selectCategoryId);
  };

  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
  });
  const mutation = useMutation({
    mutationFn: updateTourCategory,
  });

  return (
    <tr key={tour.id}>
      <td scope='row'>{tour.name}</td>
      <td>{tour.country}</td>
      <td>{tour.city}</td>
      <td>
        <select
          className='form-select'
          aria-label='Select Category'
          id={tour.id}
          value={categoryId ?? tour.categoryId}
          onChange={(e) => handleTypeChange(tour.id, e.target.value)}
        >
          {categoryData?.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button
          style={{
            backgroundColor: `${mutation.isPending ? 'white' : '#136060'}`,
            width: '110px',
            border: '2px solid #136060',
          }}
          onClick={() => {
            mutation.mutate({ tourId, categoryId });
          }}
        >
          {mutation.isPending ? (
            <div
              class='spinner-border text-success'
              role='status'
            >
              <span class='sr-only'>Loading...</span>
            </div>
          ) : (
            'Actualizar'
          )}
        </button>
      </td>
    </tr>
  );
};

export default TourListRow;
