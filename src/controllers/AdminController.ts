import supabase from "../utils/supabaseClient.ts";

const createJobOpening = async (
  orgId: number,
  openingName: string,
  problemStatement: string,
  jobTags: string[],
  location: string,
  salary: string
) => {
  try {
    const { data, error } = await supabase
      .from("JobOpenings")
      .insert({
        org_id: orgId,
        opening_name: openingName,
        assignment_problem_statement: problemStatement,
        job_tags: jobTags,
        location: location,
        salary: parseInt(salary)
      })
      .select();

    if (error) {
      console.log(error);
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//* get job openings per organisation
const JobsPerCompany = async (org_id: number) => {
  const response = await supabase
    .from("JobOpenings")
    .select("*")
    .eq("org_id", org_id);

  return response.data;
};

//* Get all Applications
const AllApplications = async (opening_id: number) => {
  const response = await supabase
    .from("CandidateSubmissions")
    .select("*")
    .eq("opening_id", opening_id);
  console.log(response.data);
};

export default { createJobOpening, JobsPerCompany, AllApplications };
