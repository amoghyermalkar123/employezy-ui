import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function CalenderComp() {
  const events = [{ title: "Meeting", start: new Date() }];

  return (
    <div className="">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        // eventContent={renderEventContent}
      />
    </div>
  );
}

export default CalenderComp;
