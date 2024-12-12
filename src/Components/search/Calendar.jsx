import DatePicker from 'react-datepicker';
import './calendar.css';

const Calendar = ({ rangeStart, setRangeStart, rangeEnd, setRangeEnd }) => {
  const today = new Date();

  const selectStartDate = (date) => {
    setRangeStart(date);
  };
  const selectEndDate = (date) => {
    setRangeEnd(date);
  };

  return (
    <div
      className='custom-datepicker-container d-flex flex-row gap-2'
      style={{ zIndex: 5 }}
    >
      <div
        className='d-flex flex-column m-0 m-0 align-items-start'
        style={{
          backgroundColor: '#d9d9d9',
          border: '2px solid #0A3E42',
          borderRadius: '5px',
          fontSize: '15px',
        }}
      >
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
          className='custom-date-picker'
        />
      </div>
      <div
        className='d-flex flex-column m-0 align-items-start'
        style={{
          backgroundColor: '#d9d9d9',
          border: '2px solid #0A3E42',
          borderRadius: '5px',
        }}
      >
        <p
          className='m-0 px-2'
          style={{
            color: '#0A3E42',
            fontWeight: 'bold',
            backgroundColor: '#d9d9d9',
            fontSize: '15px',
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
