import { AppliedJobUI } from "../models/jobs.ts";
import Nudge from "../models/nudge.ts";
import jc from "../controllers/JobController";

export function CandidateDetails(props: { appliedJobs: AppliedJobUI[] }) {
    const handleNudge = async (nudge: AppliedJobUI) => {
        const nudgeRecruiter: Nudge = {
            candidate_id: nudge.candidate_id,
            submission_id: nudge.submission_id,
            opening_id: nudge.opening_id,
            nudge_message: "Hey! Hope you are well, please take a moment to review my submission, Thanks!",
        }
        const response = await jc.nudgeAboutOpening(nudgeRecruiter);
        if (response === "ok") {
            console.log("nudge called", nudge);
        }
    }

    return (
        <div>
            {
                props.appliedJobs.map((item) => {
                    return (
                        <div>
                            <h1 className='text-2xl font-bold mb-4'>Application Details</h1>
                            <button onClick={() => handleNudge(item)} className="btn btn-outline btn-info">Nudge</button>
                            <div className='bg-gray-100 p-4 rounded-lg'>
                                <div className='flex items-center mb-2'>
                                    <div className='font-bold'>Org Name:</div>
                                    <div className='ml-2'>{item.company}</div>
                                </div>
                                <div className='flex items-center mb-2'>
                                    <div className='font-bold'>AI Evaluation:</div>
                                    <div className='ml-2'>{item.ai_evaluation}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='font-bold'>Evaluation Rating:</div>
                                    <div className='ml-2'>{item.rating}</div>
                                </div>
                                <div className='flex items-center mb-2'>
                                    <div className='font-bold'>Date of Application:</div>
                                    <div className='ml-2'>1-1-2024</div>
                                </div>
                                <div className='flex items-center mb-2'>
                                    <div className='font-bold'>Opening Name:</div>
                                    <div className='ml-2'>SDE-1</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='font-bold'>Recruiter Status</div>
                                    <div className='ml-2'>Selected</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

