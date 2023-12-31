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

export default { getAllOpenings, submitAssignment };
