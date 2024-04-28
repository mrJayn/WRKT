import { createAsyncThunk } from '@reduxjs/toolkit'
import apiQuery from '@api/query'

const defaultActions = ['list', 'create', 'update', 'destroy']

const createModelAsyncThunks = ({ modelName, actions = defaultActions, excludeActions = [] } = {}) => {
	const allowedActions = actions.filter((x) => excludeActions.indexOf(x) < 0)
	console.log('> allowedActions =', allowedActions)

	const modelURL = `/user/${modelName}/`
	const getDetailURL = (id) => `${modelURL}${id}/`

	let modelThunks = {}

	if ('list' in allowedActions) {
		let listTypePrefix = `${modelName}/list`
		modelThunks['list'] = createAsyncThunk(listTypePrefix, async () => {
			return await apiQuery({ method: 'GET', url: modelURL })
		})
	}
	if ('create' in allowedActions) {
		let createTypePrefix = `${modelName}/create`
		modelThunks['create'] = createAsyncThunk(createTypePrefix, async () => {
			return await apiQuery({ method: 'POST', url: modelURL })
		})
	}
	if ('update' in allowedActions) {
		let updateTypePrefix = `${modelName}/update`
		modelThunks['update'] = createAsyncThunk(updateTypePrefix, async ({ id, data } = {}) => {
			return await apiQuery({ method: 'PATCH', url: getDetailURL(id), data })
		})
	}
	if ('destroy' in allowedActions) {
		let destroyTypePrefix = `${modelName}/destroy`

		modelThunks['destroy'] = createAsyncThunk(destroyTypePrefix, async (id) => {
			return await apiQuery({ method: 'DELETE', url: getDetailURL(id) })
		})
	}

	return modelThunks
}

export default createModelAsyncThunks
