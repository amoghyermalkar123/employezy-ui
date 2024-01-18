export default interface Nudge {
    last_nudged_at: Date;
    submission_id: number;
    candidate_id: string;
    opening_id: number;
    nudge_message: string;
}

