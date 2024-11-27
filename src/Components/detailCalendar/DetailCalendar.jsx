import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./detailCalendar.css";

const DetailCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const disabledDates = [
    new Date('2024-11-29'),
    new Date('2024-12-03'),
    new Date('2024-12-06'),
    new Date('2024-12-07'),
    new Date('2024-12-22'),
    new Date('2024-12-25'),
  ]

  return (
    <DatePicker 
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      monthsShown={2}
      minDate={new Date()}
      excludeDates={disabledDates}
    />
  )
}

export default DetailCalendar;