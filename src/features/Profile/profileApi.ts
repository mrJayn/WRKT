import API from '@features/API'
import CONST from '@src/CONST'
import type { Profile } from '@src/types/features'

type EditableProfile = Omit<Profile, 'id' | 'user'>

const URLS = {
	PROFILE: 'profile',
}

const profileAPI = API.injectEndpoints({
	endpoints: (builder) => ({
		/** Get the profile of the current user. */
		getProfile: builder.query<Profile, void>({
			query: () => URLS.PROFILE,
			providesTags: (result) =>
				result ? [...Object.keys(result).map((id) => ({ type: 'Profile' as const, id })), 'Profile'] : ['Profile'],
		}),

		/** Update the profile of the current user. */
		updateProfile: builder.mutation<Profile, EditableProfile>({
			query: (data) => ({
				url: URLS.PROFILE,
				method: 'PATCH',
				data,
			}),
			invalidatesTags: (result, error, args) =>
				result ? [...Object.keys(result).map((id) => ({ type: 'Profile' as const, id }))] : [],
		}),
	}),
})

export default profileAPI
export const { useGetProfileQuery, useUpdateProfileMutation } = profileAPI
