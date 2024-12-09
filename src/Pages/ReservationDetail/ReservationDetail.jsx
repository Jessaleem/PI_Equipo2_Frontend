import React from 'react';
import { useGeneralContext } from '../../context/useGeneralContext';

const ReservationDetail = () => {
  const { state } = useGeneralContext();
  console.log('reservationDetails', state.reservationDetails);
  return <div>ReservationDetail</div>;
};

export default ReservationDetail;
