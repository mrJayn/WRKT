import { createAsyncThunk } from '@reduxjs/toolkit'
import apiQuery from '@api/query'

const retrieveUser = createAsyncThunk(`user/retrieve`, async () => await apiQuery({ method: 'GET', url: `/user/` }))

const updateUser = createAsyncThunk(
	`user/update`,
	async (userData) => await apiQuery({ method: 'PATCH', url: `/user/`, data: userData })
)

export const userDispatchMap = (dispatch) => ({
	retrieve: () => dispatch(retrieveUser()),
	update: (userData) => dispatch(updateUser(userData)),
})

export default {
	retrieveUser,
	updateUser,
}
