import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './selectedCalendar.css';

const SelectedCalendar = ({ id, selectedDate, setSelectedDate }) => {
  const { data: availableDates = [], isLoading } = useQuery({
    queryKey: ['availableDates', id],
    queryFn: () => getAvailableDatesByTourId(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Cargando fechas disponibles...</p>;

  const parsedAvailableDates = availableDates.map((dateObj) => ({
    id: dateObj.id,
    date: new Date(dateObj.fecha),
  }));

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const selected = parsedAvailableDates.find(
      (d) =>
        d.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );

    if (selected) {
      console.log(`ID de fecha_experiencia seleccionada: ${selected.id}`);
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      minDate={new Date()}
      startDate={new Date()}
      includeDates={parsedAvailableDates.map((d) => d.date)}
      inline
    />
  );
};

export default SelectedCalendar;
