/**
 * AppliedJobs component fetches and displays a list of jobs the user has applied to,
 * along with the AI evaluation result for each application.
 *
 * It uses the JobController to fetch the applied jobs data based on the user's ID.
 * The jobs data is mapped into a simplified AppliedJobUI interface to extract just
 * the relevant fields needed for display.
 *
 * The applied jobs state is updated with the latest data on mount and when the
 * userDetails change. The state is updated immutably by creating a Set from the
 * previous state merged with new data to ensure no duplicates.
 *
 * The UI displays each applied job in a card with company, rating, and ai_evaluation.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import jc from "../controllers/JobController";
import zustandStore from "../store/ZustandStore.ts";
import { JobOpening, AppliedJobUI, Evaluation } from "../models/jobs.ts";
function AppliedJobs() {
    const userDetails = zustandStore((state) => state.userDetails);
    const [appliedJobs, setAppliedJobs] = useState<AppliedJobUI[]>([]);

    useEffect(() => {
        const getEvals = async () => {
            if (userDetails && userDetails.candidateID) {
                const res: JobOpening[] | null = await jc.fetchAppliedJobs(
                    userDetails.candidateID,
                );
                if (res != null) {
                    const updatedJobs = res.map((item: JobOpening) => {
                        const submission = item.CandidateSubmissions[0];
                        const parsed: Evaluation = JSON.parse(submission.ai_evaluation);
                        const appliedJob: AppliedJobUI = {
                            ai_evaluation: parsed.code.evaluation,
                            company: item.Orgs.name,
                            rating: parsed.code.rating,
                        };
                        return appliedJob;
                    });

                    setAppliedJobs((prevJobs) => {
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
                    <div
                        key={index}
                        className="w-full flex flex-col p-8 border-2 shadow-md my-2 rounded-lg"
                    >
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