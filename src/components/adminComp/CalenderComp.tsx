import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import supabaseClient from "../../utils/supabaseClient";
import { useEffect, useState } from "react";
import { CalenderType } from "../../types/calenderTypes";

function CalenderComp() {
  const [calEvents, setCalEvents] = useState<CalenderType[]>([]);

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

  const events = calEvents.map((event) => ({
    ...event,
    id: event.id.toString()
  }));

  return (
    <div className="">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventClick={() => {
          const modal = document.getElementById(
            "my_modal_1"
          ) as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}
        eventContent={renderEventContent}
      />
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo: CalenderType) {
  return (
    <>
      <i
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_1"
          ) as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        {eventInfo.id}
      </i>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <b>{eventInfo.org_id}</b>
          <i>{eventInfo.user_id}</i>
          <i>{eventInfo.meet_link}</i>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default CalenderComp;
