import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Nudge from '../models/nudge'
import { useEffect, useState } from 'react'
import jc from "../controllers/JobController";

function CalenderComp() {
    const [calEvents, setCalEvents] = useState<CalenderType[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<CalenderType | null>(null);
    const [userId, setUserId] = useState("");

    const handleEvents = async () => {
        const response = await jc.getMeetingLinks();
        if (response) {
            setCalEvents(response);
        }
    };

    useEffect(() => {
        handleEvents();
    }, []);

    const events = calEvents.map(event => ({
        ...event,
        id: event.id.toString()
    }));

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
                                        setUserId(selectedEvent.meet_link);
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

interface CalenderType {
    created_at: Date;
    start: Date;
    id: number;
    meet_link: string;
    org_id: number;
    user_id: string;
}

function Dashboard() {
    const [nudges, setNudges] = useState<any[] | null>(null);

    useEffect(() => {
        const det = localStorage.getItem("userDetails")
        if (det) {
            const userDetails = JSON.parse(det);
            const getNudges = async () => {
                const response: any[] | null = await jc.fetchNudges(userDetails.candidateID);
                if (response != null) {
                    setNudges(response.map((nudge) => {
                        var date = new Date(nudge.CandidateSubmissions.submitted_at)
                        nudge.CandidateSubmissions.submitted_at = date.toISOString().substring(0, 10);

                        var anotherdate = new Date(nudge.last_nudged_at)
                        nudge.last_nudged_at = anotherdate.toISOString().substring(0, 10);
                        return nudge
                    }))
                }
            }
            getNudges()
        }
    }, [])

    return (
        <>
            <div className="flex flex-col h-full w-full bg-white overflow-auto">
                <div className="w-full flex flex-row flex-wrap justify-evenly my-2 p-2">
                    <div className="w-full md:w-1/2">
                        <CalenderComp />
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="card h-full w-full bg-base-100 border-2">
                            <div className="card-body">
                                <div className='flex flex-row justify-between'>
                                    <h2 className="card-title">Your Nudges</h2>
                                </div>
                                <div className="divider" />
                                <div className="w-full">
                                    <div className="overflow-x-auto">
                                        <table className="table table-xs">
                                            <thead>
                                                <tr>
                                                    <th>Sr No.</th>
                                                    <th>Opening Name</th>
                                                    <th>Application Submitted At</th>
                                                    <th>Last Nudged At</th>
                                                </tr>
                                                {nudges?.map((item, idx) => {
                                                    return (
                                                        <tr>
                                                            <th>{idx+1}</th>
                                                            <td>{item.JobOpenings.opening_name}</td>
                                                            <td>{item.CandidateSubmissions.submitted_at}</td>
                                                            <td>{item.last_nudged_at}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        </>);
}

export default Dashboard;
