import axiosClient from './axiosClient'
import Url from './Url'

const withHandlers = async (promise) => {
	return await promise
		.then(({ data, status }) => ({ data, status }))
		.catch((error) => {
			console.log(error)
			return { data: undefined, status: undefined }
		})
}

async function getAPI({ url, route, details, params = {} } = {}) {
	let URL = url ?? (await Url.get(route, details))
	return withHandlers(axiosClient.get(URL, { params }))
}

async function postAPI({ url, route, details, data } = {}) {
	let URL = url ?? (await Url.get(route, details))
	return withHandlers(axiosClient.post(URL, data))
}

async function updateAPI({ url, route, details, data } = {}) {
	let URL = url ?? (await Url.get(route, details))
	return withHandlers(axiosClient.patch(URL, data))
}

async function deleteAPI({ url, route, details } = {}) {
	let URL = url ?? (await Url.get(route, details))
	return await axiosClient
		.delete(URL)
		.then(() => console.log('Success. Item Deleted.'))
		.catch((e) => console.log(e))
}

export { getAPI, postAPI, updateAPI, deleteAPI }
