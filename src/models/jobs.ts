export interface AppliedJobUI {
    company: string;
    ai_evaluation: string;
    rating: string;
}

export interface JobOpening {
    opening_id: number;
    created_at: Date;
    org_id: number;
    opening_name: string;
    assignment_problem_statement: string;
    technical_questions: null;
    salary: number;
    job_tags: string[];
    location: string;
    CandidateSubmissions: CandidateSubmission[];
    Orgs: Orgs;
}

export interface CandidateSubmission {
    submission_id: number;
    submitted_at: Date;
    opening_id: number;
    code: string;
    ai_evaluation: string;
    candidate_id: string;
    rating: null;
    evaluation_received_at: null;
}

export interface Orgs {
    org_id: number;
    created_at: Date;
    password: string;
    email: string;
    name: string;
    updated_at: null;
}

export interface Evaluation {
    code: Code;
}

export interface Code {
    evaluation: string;
    rating: string;
}

export interface SavedJob {
    candidate_id: string,
    opening_id: string,
}
