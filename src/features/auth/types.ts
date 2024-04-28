/**
 * Types used in the `authApi` injected endpoint.
 */

type JWT = {
	access: string
	refresh: string
}

type UserEmail = {
	email: string
}

type UserPhoneNumber = {
	phone_number: string
}

type UserCredentials = UserEmail & {
	password: string
}

type UserData = UserCredentials & {
	username?: string
	first_name?: string
	last_name?: string
}

type UserToken = {
	token: string
}

// type RefreshToken = {
// 	refresh: string
// }

export type { JWT, UserEmail, UserCredentials, UserData, UserToken }
