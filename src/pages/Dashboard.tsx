import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Nudge from '../models/nudge'
import { useEffect } from 'react'

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
    useEffect(() => {

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
                                                    <th>SubmittedAt</th>
                                                    <th>Last Nudged At</th>
                                                    <th>Actions</th>
                                                    <th>Feedback</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>1</th>
                                                    <td>Cy Ganderton</td>
                                                    <td>Quality Control Specialist</td>
                                                    <td>Littel, Schaden and Vandervort</td>
                                                    <td><button className='badge badge-success'>Nudge Now</button></td>
                                                    <td>12/16/2020</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

export default Dashboard;
