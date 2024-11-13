import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { updateUserType } from '../../provider/user/userProvider';

const UserListRow = ({ user }) => {
  const [userId, setUserId] = useState();
  const [userType, setUserType] = useState(user.type);
  const handleTypeChange = (userId, newType) => {
    setUserId(userId);
    setUserType(newType);
  };

  const mutation = useMutation({
    mutationFn: updateUserType,
  });

  return (
    <tr key={user.id}>
      <td scope='row'>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.registrationDate}</td>
      <td>
        <select
          className='form-select'
          aria-label='Select Type'
          id={user.id}
          value={userType}
          onChange={(e) => handleTypeChange(user.id, e.target.value)}
        >
          <option value='2'>Si</option>
          <option value='3'>No</option>
        </select>
      </td>
      <td>
        <button
          style={{ backgroundColor: '#136060' }}
          onClick={() => {
            mutation.mutate({ userId, type: userType });
          }}
        >
          Actualizar
        </button>
      </td>
    </tr>
  );
};

export default UserListRow;
