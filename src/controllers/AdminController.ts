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

//* get user applications per one job opening
const UsersPerJobApplication = async (opening_id: number) => {
  const response = await supabase
    .from("CandidateSubmissions")
    .select("*,users:Users(*)")
    .eq("opening_id", opening_id);

  return response.data;
};

//* Get all Applications
const AllApplications = async (org_id: number) => {
  const { data, error } = await supabase
    .from("JobOpenings")
    .select(
      `*,
            subs:CandidateSubmissions(*),
            orgs:Orgs(*)
        `
    )
    .eq("org_id", org_id);
  console.log(data, error);

  return data;
};

//* Get all Jobs
const AllJobs = async (org_id: number) => {
  const { data, error } = await supabase
    .from("JobOpenings")
    .select("*")
    .eq("org_id", org_id)
    .neq("is_deleted", true);

  console.log(data, error);

  return data;
};

//* Update Job status to deleted
const DeleteJob = async (job_id: number) => {
  const { data, error } = await supabase
    .from("JobOpenings")
    .update({ is_deleted: true })
    .eq("opening_id", job_id);

  console.log(data, error);

  return data;
};

const ScheduleMeeting = async (
  user_id: number,
  org_id: number,
  date: string,
  meet_link: string
) => {
  try {
    const { data, error } = await supabase
      .from("Meetings")
      .insert({ user_id, org_id, date, meet_link });
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  createJobOpening,
  AllApplications,
  UsersPerJobApplication,
  AllJobs,
  DeleteJob,
  ScheduleMeeting
};
