export default interface Nudge {
    id: number;
    lastNudgedAt: Date;
    submissionId?: number;
    candidateId?: string;
    openingId?: number;
    nudgeMessage?: string;
}

