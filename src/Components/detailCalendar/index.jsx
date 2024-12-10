import DetailCalendar from "./DetailCalendar";

const CalendarContainer = ({ id }) => {
  return (
    <section className="calendar-container-title">
      <h2>Ver Disponibilidad:</h2>
      <DetailCalendar id={id} />
    </section>
  );
};

export default CalendarContainer;
