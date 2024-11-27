import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const Calendar = () => {
  const [rangeStart, setRangeStart] = useState(new Date());
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 2);
  const [rangeEnd, setRangeEnd] = useState(defaultEndDate);
  const today = new Date();

  const selectStartDate = (d) => {
    setRangeStart(d);
  };

  const selectEndDate = (d) => {
    setRangeEnd(d);
  };
  return (
    <div className=' custom-datepicker-container d-flex flex-row z-5 gap-2'>
      <DatePicker
        selectsStart
        selected={rangeStart}
        minDate={today}
        startDate={rangeStart}
        endDate={rangeEnd}
        onChange={selectStartDate}
        dateFormat={'dd/MM/yyyy'}
      />
      <DatePicker
        selectsEnd
        selected={rangeEnd}
        startDate={rangeStart}
        endDate={rangeEnd}
        onChange={selectEndDate}
        dateFormat={'dd/MM/yyyy'}
      />
    </div>
  );
};

export default Calendar;
