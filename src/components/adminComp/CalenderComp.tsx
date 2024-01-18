import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import supabaseClient from "../../utils/supabaseClient";
import { useEffect, useState } from "react";
import { CalenderType } from "../../types/calenderTypes";

function CalenderComp() {
  const [calEvents, setCalEvents] = useState<CalenderType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalenderType | null>(null);
  const [userId, setUserId] = useState("");

  const handleEvents = async () => {
    const { data, error } = await supabaseClient.from("Meetings").select("*");
    if (data) {
      setCalEvents(data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    handleEvents();
  }, []);

  const events = calEvents.map(event => ({
    ...event,
    id: event.id.toString()
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventClick = (eventClickInfo: any) => {
    const clickedEventId = eventClickInfo.event.id;
    const clickedEvent = calEvents.find(
      event => event.id.toString() === clickedEventId
    );
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);

      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  };

  return (
    <div className="">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventClick={handleEventClick}
        eventContent={renderEventContent(userId)}
      />

      {selectedEvent &&
        <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Event Details</h3>
            <ul>
              <li>
                <b>
                  {selectedEvent.org_id}
                </b>
              </li>
              <li>
                <i>
                  {selectedEvent.user_id}
                </i>
              </li>
              <li>
                <a href={selectedEvent.meet_link} target="_blank">
                  {selectedEvent.meet_link}
                </a>
              </li>
            </ul>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn"
                  onClick={() => {
                    setUserId(selectedEvent.user_id);
                    const modal = document.getElementById(
                      "my_modal_1"
                    ) as HTMLDialogElement;
                    if (modal) {
                      modal.close();
                    }
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>}
    </div>
  );
}

// Render function for calendar events
function renderEventContent(userId: string) {
  return (
    <div className="text-wrap overflow-hidden">
      <p className="p-2 text-white">
        {userId}
      </p>
    </div>
  );
}

export default CalenderComp;
