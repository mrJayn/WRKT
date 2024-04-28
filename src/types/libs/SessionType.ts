type userType = {
	email?: string
	id?: number
}

type SessionProps = {
	authToken?: string
	user?: userType
}

export default SessionProps
