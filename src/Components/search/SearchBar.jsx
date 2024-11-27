import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getAllTours } from '../../provider/tours/toursProvider';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isError, error } = useQuery({
    queryKey: ['tours', searchTerm],
    queryFn: () => getAllTours({ search: searchTerm }),
    enabled: !!searchTerm,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const dataToShow = data?.slice(0, 7);
  return (
    <div className='search-input d-flex flex-column'>
      <input
        type='text'
        placeholder='Buscar'
        value={searchTerm}
        onChange={handleChange}
        className='border w-full'
      />
      {isError && (
        <p>
          Error: {error instanceof Error ? error.message : 'Algo salió mal'}
        </p>
      )}
      {data && (
        <ul
          className='border'
          style={{ backgroundColor: 'white' }}
        >
          {dataToShow?.map((result) => (
            <li
              key={result.id}
              className='p-2 border-b'
            >
              {`${result.name}-${result.country}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
