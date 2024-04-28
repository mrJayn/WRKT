import API from '../API'
import type { User } from '@src/types/features'

const userApi = API.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
			query: () => ({ url: 'user/' }),
		}),
	}),
})

export default userApi
export const { useGetUserQuery } = userApi
