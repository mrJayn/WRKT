import { createAsyncThunk } from '@reduxjs/toolkit'
import apiQuery from '@api/query'

const getProfile = createAsyncThunk(`user/retrieve`, async () => {
	return await apiQuery({ method: 'get', url: `/user/profile/` })
})

export default {
	get: getProfile,
	//
}
