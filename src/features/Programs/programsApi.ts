import type { Program } from '@src/types/features'
import API from '@features/API'
import { providesList } from '../tagUtils'

type EditableProgram = {
	id: number
	name?: string
	startdate?: string
	duration?: number
	isActive?: boolean
	order?: number
}

const programsApi = API.injectEndpoints({
	endpoints: (builder) => ({
		/** Get the programs list for the current user. */
		getProgramsList: builder.query<Program[], void>({
			query: () => 'programs/',
			providesTags: (result) => providesList(result, 'Program'),
		}),

		/** Create a new program. */
		createProgram: builder.mutation<Program, void>({
			query: () => ({
				url: 'programs/',
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Program', id: 'LIST' }],
		}),

		/** Update an existing program. */
		updateProgram: builder.mutation<Program | Program[], EditableProgram>({
			query: ({ id, ...item }) => ({
				url: `programs/${id}/`,
				method: 'PATCH',
				data: item,
			}),
			invalidatesTags: (_result, _error, item) => [{ type: 'Program', id: item.id }],
		}),

		/** Delete a program. */
		deleteProgram: builder.mutation<void, { id: number }>({
			query: ({ id }) => ({
				url: `programs/${id}/`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Program', id: 'LIST' }],
		}),
	}),
})

export default programsApi

export const { useGetProgramsListQuery, useCreateProgramMutation, useUpdateProgramMutation, useDeleteProgramMutation } =
	programsApi
