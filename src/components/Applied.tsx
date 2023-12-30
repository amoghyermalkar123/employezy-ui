/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import jc from "../controllers/JobController";
import zustandStore from "../store/ZustandStore.ts";

interface AppliedJobUI {
    company: string,
    ai_evaluation: string,
    rating: number,
}

function AppliedJobs() {
    const userDetails = zustandStore(state => state.userDetails);
    const [appliedJobs, setAppliedJobs] = useState<AppliedJobUI[]>([]);

    useEffect(() => {
        const getEvals = async () => {
            if (userDetails && userDetails.candidateID) {
                const res: any = await jc.fetchAppliedJobs(userDetails.candidateID);
                if (res != null) {
                    const updatedJobs = res.map((item) => {
                        const parsed = JSON.parse(item.CandidateSubmissions[0].ai_evaluation);
                        return {
                            ai_evaluation: parsed.evaluation,
                            company: item.Orgs.name,
                            rating: parsed.rating,
                        };
                    });

                    setAppliedJobs(prevJobs => {
                        // Use a Set to ensure uniqueness based on ai_evaluation
                        const uniqueJobs = new Set([...prevJobs, ...updatedJobs]);
                        return [...uniqueJobs];
                    });
                }
            }
        };

        getEvals();
    }, [userDetails]);

    return (
        <div className="w-screen h-screen">
            <div className="h-full mx-4 md:mx-12 lg:mx-24 xl:mx-48">
                {appliedJobs.map((job, index) => (
                    <div key={index} className="w-full flex flex-col p-8 border-2 shadow-md my-2 rounded-lg">
                        <div className="w-full flex flex-row justify-between items-center">
                            <h2>{job.company}</h2>
                            <h2>{job.rating}</h2>
                        </div>
                        <div className="divider divide-x-0"></div>
                        <p>{job.ai_evaluation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AppliedJobs;