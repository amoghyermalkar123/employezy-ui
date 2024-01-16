import { SavedJob } from "../models/jobs.ts";
import CandidateSubmission from "../types/submission";
import supabase from "../utils/supabaseClient.ts";


// submit assignment
const submitAssignment = async (cs: CandidateSubmission) => {
    console.log("to be submitted", cs);
    const response = await supabase.from("CandidateSubmissions").insert(cs);
    console.log("submission response", response);
};

const getAllOpenings = async () => {
    const response = await supabase.from("JobOpenings").select("*, Orgs(*)");
    console.log("all opening", response.data);

    return response.data;
};

const fetchAppliedJobs = async (candidateID: string) => {
    const data = await supabase
        .from('JobOpenings')
        .select(`*,
            CandidateSubmissions!inner(*),
            Orgs(*)
        `)
        .eq("CandidateSubmissions.candidate_id", candidateID)

    return data.data
}

const saveJob = async (data: SavedJob) => {
    const response = await supabase.from("SavedJobs").insert(data);

    if (response.error === null) {
        return "ok"
    }
    return "error"
};

export default { getAllOpenings, submitAssignment, fetchAppliedJobs, saveJob };
