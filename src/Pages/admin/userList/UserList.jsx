import { useQuery } from '@tanstack/react-query';
import { getAllUser } from '../../../provider/user/userProvider';
import UserListRow from '../../../Components/Admin/UserListRow';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeneralContext } from '../../../context/useGeneralContext';

const UserList = () => {
  const navigate = useNavigate();
  const { state } = useGeneralContext();
  const loggedUser = state.isLoggedIn;
  const userInformation = state.userData;
  const { data } = useQuery({ queryKey: ['users'], queryFn: getAllUser });
  useEffect(() => {
    if (!loggedUser) {
      navigate('/');
    } else if (userInformation.type === 3) {
      navigate('/');
    }
  }, [userInformation, loggedUser]);

  if (loggedUser && userInformation.type != 3) {
    return (
      <div className='min-vh-100 p-2'>
        <div
          className='container'
          style={{ marginTop: 150 }}
        >
          <table
            className='table table-bordered'
            style={{ maxWidth: '' }}
          >
            <thead>
              <tr>
                <th scope='col'>Nombre de usuario</th>
                <th scope='col'>Correo Electronico</th>
                <th scope='col'>Fecha de registro</th>
                <th scope='col'>Asignar como administardor</th>
                <th scope='col'>Acción</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {data?.map((user) => (
                <UserListRow
                  user={user}
                  key={user.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default UserList;
