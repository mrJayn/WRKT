/**
 * The email address or phone number of the current user.
 *
 * If both are provided, then email will take precedence as the primary credential.
 */
type UserLookupFields =
	| {
			email: string
			phone_number?: string | undefined
	  }
	| {
			email?: undefined
			phone_number: string
	  }
	| {
			email?: string
			phone_number?: string
	  }

type UserData = {
	/** Username or display name of the current user. */
	username?: string

	/** First name of the current user. */
	firstName?: string

	/** Last name of the current user. */
	lastName?: string

	/** Indicates the activity status of the current user. */
	isActive?: boolean
}

type User = UserData & {
	/** The unique identifier of the current user. ( read only ) */
	id?: number

	/** Date that the current user last signed in. ( read only ) */
	lastLogin?: string

	/** Date that the current user signed up. ( read only ) */
	dateJoined?: string
} & UserLookupFields

type UserCredentials = UserLookupFields & {
	password: string
}

export type { User, UserCredentials, UserData, UserLookupFields }
