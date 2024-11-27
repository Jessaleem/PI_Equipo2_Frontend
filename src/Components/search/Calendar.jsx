import DatePicker from 'react-datepicker';

const Calendar = ({ rangeStart, setRangeStart, rangeEnd, setRangeEnd }) => {
  const today = new Date();

  const selectStartDate = (date) => {
    setRangeStart(date);
  };
  const selectEndDate = (date) => {
    setRangeEnd(date);
  };

  return (
    <div className=' custom-datepicker-container d-flex flex-row z-5 gap-2'>
      <div className='d-flex flex-column m-0 m-0 align-items-start'>
        <p
          className='m-0 px-2'
          style={{
            color: '#0A3E42',
            fontWeight: 'bold',
            backgroundColor: '#d9d9d9',
          }}
        >
          Fecha Inicio
        </p>
        <DatePicker
          icon
          selectsStart
          selected={rangeStart}
          minDate={today}
          startDate={today}
          endDate={rangeEnd}
          onChange={selectStartDate}
          dateFormat={'dd/MM/yyyy'}
          placeholderText='Selecciona el día de inicio'
        />
      </div>
      <div className='d-flex flex-column m-0 align-items-start'>
        <p
          className='m-0 px-2'
          style={{
            color: '#0A3E42',
            fontWeight: 'bold',
            backgroundColor: '#d9d9d9',
          }}
        >
          Fecha Fin
        </p>
        <DatePicker
          icon
          selectsEnd
          selected={rangeEnd}
          minDate={rangeStart || today}
          startDate={rangeStart}
          endDate={rangeEnd}
          onChange={selectEndDate}
          dateFormat={'dd/MM/yyyy'}
          placeholderText='Selecciona el día de fin'
        />
      </div>
    </div>
  );
};

export default Calendar;
