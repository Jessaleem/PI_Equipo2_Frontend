import DetailCalendar from "./DetailCalendar"

const CalendarContainer = ({id}) => {
  return (
    <section>
      <h2 
        className="calendar-container-title"
      >Ver Disponibilidad:</h2>
      <DetailCalendar id={id} />
    </section>
  )
}

export default CalendarContainer;