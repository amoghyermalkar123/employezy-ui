import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Nudge from '../models/nudge'
import { useEffect, useState } from 'react'
import jc from "../controllers/JobController";

const events = [
    { title: 'Meeting', start: new Date() }
]

// a custom render function
function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function Dashboard() {
    const [nudges, setNudges] = useState<Nudge[] | null>(null);
    useEffect(() => {
        const getNudges = async () => {
            const response: Nudge[] | null = await jc.fetchNudges();
            if (response != null) {
                setNudges(response)
            }
        }

        getNudges()
        console.log("nudges fetched yes", nudges)
    }, [])
    return (
        <>
            <div className="flex flex-col h-full w-full bg-white overflow-auto">
                <div className="w-full flex flex-row flex-wrap justify-evenly my-2 p-2">
                    <div className="w-full md:w-1/2">
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView='dayGridMonth'
                            weekends={false}
                            events={events}
                            eventContent={renderEventContent}
                            aspectRatio={2 / 1}
                        />
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
                                                    <th></th>
                                                    <th>Opening Name</th>
                                                    <th>Org Name</th>
                                                    <th>Application Submitted At</th>
                                                    <th>Last Nudged At</th>
                                                </tr>
                                                {nudges?.map((item, idx) => {
                                                    return (
                                                        <tr>
                                                            <th>1</th>
                                                            <td>{item.opening_id}</td>
                                                            <td>{item.opening_id}</td>
                                                            <td>{item.submission_id}</td>
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
