import API from '@features/API'
import type { TagDescription } from '@reduxjs/toolkit/query'
import type { Profile } from '@src/types/features'

type EditableProfile = Omit<Profile, 'id' | 'user'>

type ProfileTags = TagDescription<'Profile'>[]

const profileTagDescriptors: ProfileTags = [
	{ type: 'Profile', id: 'notifications' },
	{ type: 'Profile', id: 'day_one_weekday' },
	{ type: 'Profile', id: 'units' },
]

const profileAPI = API.injectEndpoints({
	endpoints: (builder) => ({
		/** Get a user's profile. */
		getProfile: builder.query<Profile, void>({
			query: () => ({ url: 'user/profile/' }),
			providesTags: (result) => (result ? profileTagDescriptors : []),
		}),

		/** Update a user's profile. */
		updateProfile: builder.mutation<Profile, EditableProfile>({
			query: (data) => ({
				url: 'user/profile/',
				method: 'PATCH',
				data,
			}),
			invalidatesTags: (result, error, args) =>
				result
					? ([...Object.entries(args).map(([id, val]) => !!val && { type: 'Profile', id })] as ProfileTags)
					: [],
		}),
	}),
})

export default profileAPI

// prettier-ignore
export const {
    useGetProfileQuery,

} = profileAPI
