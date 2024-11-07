/** A JSON web token. */
type JWT = string

/** A pair of JSON web tokens. */
type TokenPair = {
	access: JWT
	refresh: JWT
}

type AuthState = {
	/** The auth token for the current user. Used to indicate authentication. */
	authToken?: string
}

export type { AuthState }
