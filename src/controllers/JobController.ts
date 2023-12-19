import { createClient } from "@supabase/supabase-js";
import CandidateSubmission from "../types/submission";

// submit assignment
const submitAssignment = async (cs: CandidateSubmission) => {
  //loading the env variables
  const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
  const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
  //creating connection
  const supabase = createClient(PROJECT_URL, API_KEY);

  console.log("to be submitted", cs)
  const response = await supabase.from("CandidateSubmissions").insert(cs);
  console.log("submission response", response);
}

const getAllOpenings = async () => {
  //loading the env variables
  const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
  const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
  //creating connection
  const supabase = createClient(PROJECT_URL, API_KEY);

  const response = await supabase.from("JobOpenings").select("*, Orgs(*)");
  console.log("all opening", response.data);

  return response.data;
};

export default {getAllOpenings, submitAssignment};
