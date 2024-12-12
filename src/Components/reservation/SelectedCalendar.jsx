import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useGeneralContext } from "@context/useGeneralContext";
import DatePicker from 'react-datepicker';
import './selectedCalendar.css';


const SelectedCalendar = ({ id, selectedDate, setSelectedDate }) => {
  const { data: availableDates = [], isLoading } = useQuery({
    queryKey: ['availableDates', id],
    queryFn: () => getAvailableDatesByTourId(id),
    enabled: !!id,
  });

  const {dispatch, state} = useGeneralContext();
  const prevAvailableDates = state.availableDates;

  useEffect(() => {
    if (
      availableDates &&
      JSON.stringify(availableDates) !== JSON.stringify(prevAvailableDates)
    ) {
      dispatch({ type: 'AVAILABLE_DATES', payload: availableDates });
    }
  }, [availableDates, dispatch]);

  if (isLoading) return <p>Cargando fechas disponibles...</p>;


  const parsedAvailableDates = availableDates.map((dateObj) => {
    const utcDate = new Date(dateObj.fecha);
    
    // Agregar 12 horas para compensar el desfase de la zona horaria local
    utcDate.setHours(utcDate.getHours() + 12);
    
    return {
      id: dateObj.id,
      isoDate: dateObj.fecha, // Mantener el formato ISO original
      date: utcDate, // Utilizar el ajuste con las horas adicionales
    };
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const selected = parsedAvailableDates.find(
      (d) =>
        d.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );

    if (selected) {
      dispatch({ type: 'SELECTED_DATE', payload: selected.id });
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
