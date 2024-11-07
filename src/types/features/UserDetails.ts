type UserDetails = {
	/** Username ( display name ) of the current user. */
	username?: string

	/** First name of the current user. */
	firstName?: string

	/** Last name of the current user. */
	lastName?: string

	/** Indicates the activity status of the current user. */
	isActive?: boolean

	/** Date that the current user last signed in. */
	lastLogin?: string

	/** Date that the current user signed up. */
	dateJoined: string
}

export default UserDetails
