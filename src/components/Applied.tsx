import { useEffect, useState } from "react";
import jc from "../controllers/JobController";
import zustandStore from "../store/ZustandStore.ts";
import { JobOpening, AppliedJobUI, Evaluation } from "../models/jobs.ts";
import { CandidateDetails } from "./EvalTemp.tsx";

function AppliedJobs() {
    const userDetails = zustandStore((state) => state.userDetails);
    const [appliedJobs, setAppliedJobs] = useState<AppliedJobUI[]>([]);

    useEffect(() => {
        const getEvals = async () => {
            if (userDetails && userDetails.candidateID) {
                const response: JobOpening[] | null = await jc.fetchAppliedJobs(
                    userDetails.candidateID,
                );

                if (response != null) {
                    const updatedJobs = response.map((item: JobOpening) => {
                        const submission = item.CandidateSubmissions[0];
                        const parsed: Evaluation = JSON.parse(submission.ai_evaluation);
                        const appliedJob: AppliedJobUI = {
                            ai_evaluation: parsed.code.evaluation,
                            company: item.Orgs.name,
                            rating: parsed.code.rating,
                            submission_id: submission.submission_id,
                            opening_id: item.opening_id,
                            candidate_id: submission.candidate_id,
                        };
                        return appliedJob;
                    });
                    setAppliedJobs([...updatedJobs]);
                }
            }
        };
        getEvals();
        console.log("appl", appliedJobs)
    }, []);

    return (
        <div className="w-screen h-screen bg-white">
            <div className="h-full mx-4 md:mx-12 lg:mx-24 xl:mx-48 flex flex-col flex-wrap">
                <CandidateDetails appliedJobs={appliedJobs} />
            </div>
        </div>
    );
}

export default AppliedJobs;
