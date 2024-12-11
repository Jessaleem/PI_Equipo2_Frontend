import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './detailCalendar.css';
import { getAvailableDatesByTourId } from '../../provider/tours/toursProvider';
import { useQuery } from '@tanstack/react-query';

const DetailCalendar = ({ id }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [monthsToShow, setMonthsToShow] = useState(
    window.innerWidth > 768 ? 2 : 1
  );

  useEffect(() => {
    const handleResize = () => {
      setMonthsToShow(window.innerWidth > 768 ? 2 : 1);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: availableDates = [], isLoading } = useQuery({
    queryKey: ['availableDates', id],
    queryFn: () => getAvailableDatesByTourId(id),
    enabled: !!id,
  });
  
  if (isLoading) return <p>Cargando fechas disponibles...</p>;

  const parsedAvailableDates = availableDates.map((dateObj) => ({
    id: dateObj.id,
    // date: new Date(dateObj.fechaDisponible),
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
    <div
      className='calendar-container'
      style={{ textAlign: 'center' }}
    >
      <div style={{ display: 'inline-block' }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          monthsShown={monthsToShow}
          minDate={new Date()}
          maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
          includeDates={parsedAvailableDates.map((d) => d.date)}
          highlightDates={parsedAvailableDates.map((d) => d.date)}
        />
      </div>
      <div style={{ marginTop: '20px', display: 'block', width: '100%' }}>
        {availableDates.length === 0 && (
          <p style={{ color: 'red', textAlign: 'center' }}>
            No existen fechas disponibles para reservar.
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailCalendar;
