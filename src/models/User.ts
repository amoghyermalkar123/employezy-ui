export interface UserSession {
    status: string,
    orgID?: string
    candidateID?: string,
    sessionExpiryIn?: number | null,
}

export interface Meetings {
    date: Date,
    org_id: string,
    meet_link: string,
}
