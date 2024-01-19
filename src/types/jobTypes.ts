interface Job {
  assignment_problem_statement: string;
  created_at: string;
  is_deleted: boolean;
  job_tags: string[];
  location: string;
  opening_id: number;
  opening_name: string;
  org_id: number;
  salary: number;
}

export default Job;
