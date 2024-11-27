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
  );
};

export default Calendar;
