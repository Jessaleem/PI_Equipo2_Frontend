import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({ setSearchTerm, data, searchTerm }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const dataToShow = Array.isArray(data) ? data.slice(0, 7) : [];

  return (
    <div
      className='search-input d-flex flex-column'
      style={{ position: 'relative' }}
    >
      <input
        style={{
          backgroundColor: 'white',
          color: 'black',
          height: '62px',
          width: '300px',
          border: '2px solid #0A3E42',
        }}
        type='text'
        placeholder='Buscar'
        value={searchTerm}
        onChange={handleChange}
        className='border w-full'
      />
      {dataToShow.length === 0 && searchTerm.length != 0 && (
        <p style={{ backgroundColor: 'white' }}>No se encontraron resultados</p>
      )}
      {data && (
        <ul
          className='border overflow-auto'
          style={{
            backgroundColor: 'white',
            listStyleType: 'none',
            maxWidth: '360px',
            maxHeight: '150px',
            position: 'absolute',
            top: '75px',
          }}
        >
          {searchTerm &&
            dataToShow?.map((result) => (
              <Link
                key={result.id}
                to={`/tour/${result.id}`}
                style={{ textDecoration: 'none', color: '#0b4040' }}
              >
                <li
                  key={result.id}
                  className='p-2 border-b'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {`${result.name}-${result.country}`}
                </li>
              </Link>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
