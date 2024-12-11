import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeneralContext } from '../../../context/useGeneralContext';
import { getAllTours } from '../../../provider/tours/toursProvider';
import { useQuery } from '@tanstack/react-query';
import TourListRow from '../../../Components/Admin/TourListRow';

const ToursList = () => {
  const navigate = useNavigate();
  const { state } = useGeneralContext();
  const loggedUser = state.isLoggedIn;
  const userInformation = state.userData;
  const { data, refetch } = useQuery({
    queryKey: ['tour'],
    queryFn: () => getAllTours(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  useEffect(() => {
    if (!loggedUser) {
      navigate('/');
    } else if (userInformation.type === 3) {
      navigate('/');
    }
  }, [userInformation, loggedUser]);

  const refreshTours = async () => {
    await refetch(); // Vuelve a cargar los datos desde la API
  };

  const sortedData = data?.slice().sort((a, b) => a.name.localeCompare(b.name)) || [];

  if (loggedUser && userInformation.type != 3)
    return (
      <div className='min-vh-100 p-2'>
        <div
          className='container'
          style={{ marginTop: 50 }}
        >
          <h1 style={{marginBottom:'30px'}}
            >Lista de Tours
            </h1>
          <table
            className='table table-bordered'
            style={{ maxWidth: '' }}
          >
            <thead>
              <tr>
                <th scope='col'>Nombre de Tour</th>
                <th scope='col'>Pais</th>
                <th scope='col'>Ciudad</th>
                <th scope='col'>Categoria</th>
                <th scope='col'>Acción</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {data?.map((tour) => (
                <TourListRow
                  tour={tour}
                  key={tour.id}
                  refreshTours={refreshTours} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ToursList;
