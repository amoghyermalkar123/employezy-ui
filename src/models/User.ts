export interface UserSession {
  status: string,
  orgID?: string
  candidateID?: string,
  sessionExpiryIn?: number | null,
}
