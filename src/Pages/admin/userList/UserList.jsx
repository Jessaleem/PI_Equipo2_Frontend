import { useQuery } from '@tanstack/react-query';
import { getAllUser } from '../../../provider/user/userProvider';
import UserListRow from '../../../Components/Admin/UserListRow';

const UserList = () => {
  const { data } = useQuery({ queryKey: ['users'], queryFn: getAllUser });
  return (
    <table className='table table-bordered'>
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
  );
};

export default UserList;
