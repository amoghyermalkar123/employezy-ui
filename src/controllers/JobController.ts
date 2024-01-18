import { SavedJob } from "../models/jobs.ts";
import Nudge from "../models/nudge.ts";
import CandidateSubmission from "../types/submission";
import supabase from "../utils/supabaseClient.ts";


// submit assignment
const submitAssignment = async (cs: CandidateSubmission) => {
    console.log("to be submitted", cs);
    const response = await supabase.from("CandidateSubmissions").insert(cs);
    console.log("submission response", response);
};

const getSavedJobs = async (candidateId: string) => {
    console.log("is", candidateId)
    const response = await supabase.from("JobOpenings").select("*, Orgs(*), SavedJobs!inner(*)").eq("SavedJobs.candidate_id", candidateId);
    console.log("all opening", response.data);

    return response.data;
};

const getAllOpenings = async () => {
    const response = await supabase.from("JobOpenings").select("*, Orgs(*)");
    return response.data;
};

const getMeetingLinks = async () => {
    const response = await supabase.from("Meetings").select("*");
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


const nudgeAboutOpening = async (nudge: Nudge) => {
    const response = await supabase.from("Nudges").insert(nudge);
    if (response.error === null) {
        return "ok"
    }
    return "error"
}

const fetchNudges = async () => {
    const response = await supabase.from("Nudges").select("*");
    return response.data
}
export default { getMeetingLinks, fetchNudges, nudgeAboutOpening, getSavedJobs, getAllOpenings, submitAssignment, fetchAppliedJobs, saveJob };
