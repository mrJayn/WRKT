/** A JSON web token. */
type AuthToken = string

/** A pair of JSON web tokens. */
type AuthTokenPair = {
	access: AuthToken
	refresh: AuthToken
}

type AuthState = {
	/** The auth token for the current user. Used to indicate authentication. */
	authToken?: AuthToken | undefined
}

export type { AuthState, AuthToken, AuthTokenPair }
