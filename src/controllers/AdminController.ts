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

export default createJobOpening;
