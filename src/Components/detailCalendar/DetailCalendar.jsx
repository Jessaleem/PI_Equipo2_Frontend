import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./detailCalendar.css";
import { disabledDates } from "../../utils/disabledDates";

const endOfMarch = new Date(new Date().getFullYear()+1, 2, 31);

const DetailCalendar = ({id}) => {
  console.log(id);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

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
      maxDate={endOfMarch}
      excludeDates={disabledDates}
    />
  )
}

export default DetailCalendar;