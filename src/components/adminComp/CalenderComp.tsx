// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import supabaseClient from "../../utils/supabaseClient";
// import { useEffect, useState } from "react";
// import { CalenderType } from "../../types/calenderTypes";

// function CalenderComp() {
//   const [calEvents, setCalEvents] = useState<CalenderType[]>([]);

//   const handleEvents = async () => {
//     const { data, error } = await supabaseClient.from("Meetings").select("*");
//     if (data) {
//       setCalEvents(data);
//     } else {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     handleEvents();
//   }, []);

//   const events = calEvents.map((event) => ({
//     ...event,
//     id: event.id.toString()
//   }));

//   return (
//     <div className="">
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         weekends={true}
//         events={events}
//         eventClick={() => {
//           const modal = document.getElementById(
//             "my_modal_1"
//           ) as HTMLDialogElement;
//           if (modal) {
//             modal.showModal();
//           }
//         }}
//         eventContent={renderEventContent}
//       />
//     </div>
//   );
// }

// // a custom render function
// function renderEventContent(eventInfo: CalenderType) {

//   return (
//     <>
//       <i
//         onClick={() => {
//           const modal = document.getElementById(
//             "my_modal_1"
//           ) as HTMLDialogElement;
//           if (modal) {
//             modal.showModal();
//           }
//         }}
//       >
//         {eventInfo.id}
//       </i>
//       {/* Open the modal using document.getElementById('ID').showModal() method */}

//       <dialog id="my_modal_1" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Hello!</h3>
//           <p className="py-4">
//             Press ESC key or click the button below to close
//           </p>
//           <b>{eventInfo.org_id}</b>
//           <i>{eventInfo.user_id}</i>
//           <i>{eventInfo.meet_link}</i>
//           <div className="modal-action">
//             <form method="dialog">
//               {/* if there is a button in form, it will close the modal */}

//               <button className="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </>
//   );
// }

// export default CalenderComp;

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import supabaseClient from "../../utils/supabaseClient";
import { useEffect, useState } from "react";
import { CalenderType } from "../../types/calenderTypes";

function CalenderComp() {
  const [calEvents, setCalEvents] = useState<CalenderType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalenderType | null>(null);

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
        eventContent={renderEventContent}
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
function renderEventContent(eventInfo: CalenderType) {
  return (
    <i className="text-xl text-white">
      {eventInfo.id}
    </i>
  );
}

export default CalenderComp;
