import { retry } from '@reduxjs/toolkit/query'
import API from '@features/API'
import { updateAuths } from '@api/auth'
import type { JWT, UserEmail, UserCredentials, UserData, UserToken } from './types'

const transformTokenPairResponse = async (jwt: JWT) => {
	await updateAuths(jwt)
	return {
		token: jwt.access,
	}
}

const authApi = API.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * Login an existing user with an `email` and `password`,
		 * and return a token str to inidcate authentication.
		 */
		login: builder.mutation<UserToken, UserCredentials>({
			query: (UserCredentials) => ({
				url: 'login/',
				method: 'POST',
				data: UserCredentials,
			}),
			transformResponse: transformTokenPairResponse,
			extraOptions: {
				maxRetries: 0,
				backoff: () => {
					retry.fail({
						cause: 'Connection Error',
						message: 'Our servers may be down. Please try again later.',
					})
				},
			},
		}),

		/**
		 * Register a new user.
		 */
		register: builder.mutation<UserToken, UserData>({
			query: (userData) => ({
				url: 'register/',
				method: 'POST',
				data: userData,
			}),
			transformResponse: transformTokenPairResponse,
		}),

		/**
		 * Validates a user email address.
		 */
		validateEmail: builder.mutation<Partial<UserEmail>, UserEmail>({
			query: (userData) => ({
				url: `register/validate/`,
				method: 'POST',
				data: userData,
			}),
			// onQueryStarted: ({ email }, { dispatch }) => {
			// 	dispatch(updateUser({ email }))
			// },
			transformErrorResponse: (error: { data: any }) => {
				return { message: error.data.email['0'] }
			},
			extraOptions: {
				maxRetries: 0,
			},
		}),

		/**
		 * Reobtain a users auth token from a stored refresh token.
		 */
		refresh: builder.mutation<UserToken, UserToken>({
			query: ({ token }) => ({
				url: 'refresh/',
				method: 'POST',
				data: { refresh: token },
			}),
			transformResponse: transformTokenPairResponse,
			extraOptions: {
				maxRetries: 0,
			},
		}),
	}),
})

export default authApi

export const { useLoginMutation, useRegisterMutation, useValidateEmailMutation } = authApi
