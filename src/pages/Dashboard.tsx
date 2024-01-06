import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { CiBookmark } from "react-icons/ci";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { CiCircleCheck } from "react-icons/ci";


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
    return (
        <>
            <div className="flex flex-col h-full w-full bg-white">
                <div className="w-full stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat place-items-center">
                        <button className='btn btn-primary btn-outline w-full h-full'><CiBookmark />SAVE</button>
                    </div>
                    <div className="stat place-items-center">
                        <button className='btn btn-secondary btn-outline w-full h-full'><CiCircleCheck />APPLIED</button>
                    </div>
                    <div className="stat place-items-center">
                        <button className='btn btn-accent btn-outline w-full h-full'><RiCompassDiscoverLine />DISCOVER</button>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-evenly my-2 p-2">
                    <div className="w-1/2">
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView='dayGridMonth'
                            weekends={false}
                            events={events}
                            eventContent={renderEventContent}
                            // height={250}
                            aspectRatio={2 / 1}
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <div className="stats shadow h-full w-full text-center">
                            <div className="stat w-full">
                                <div className="stat-title">Job Success Rate</div>
                                <div className="stat-value">35%</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h2 className='text-3xl'>Follow-Up</h2>
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
        </>);
}

export default Dashboard;
