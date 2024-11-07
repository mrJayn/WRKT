import type { User } from '@src/types/features'
import API from '@features/API'

type UserData = Pick<User, 'username' | 'firstName' | 'lastName' | 'isActive'>

const userAPI = API.injectEndpoints({
	endpoints: (builder) => ({
		/** Get the current user. */
		getUser: builder.query<User, void>({
			query: () => 'user/',
		}),

		/** Update the current user. */
		updateUser: builder.mutation<User, UserData>({
			query: (userData) => ({
				method: 'PATCH',
				url: 'user/update/',
				data: userData,
			}),
		}),

		/** Change the email address of the current user. */
		updateUserEmail: builder.mutation<User, { email: string | undefined }>({
			query: ({ email }) => ({
				method: 'POST',
				url: 'user/update/email/',
				data: { email },
			}),
		}),

		/** Update the phone number of the current user. */
		updatePhoneNumber: builder.mutation<User, { phoneNumber: string | undefined }>({
			query: ({ phoneNumber }) => ({
				method: 'POST',
				url: 'user/update/phone/',
				data: { phoneNumber },
			}),
		}),
	}),
})

export default userAPI
export const { useGetUserQuery, useUpdateUserMutation } = userAPI
