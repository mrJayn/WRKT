import axiosClient, { AxiosClientRequestConfig, AxiosClientResponse } from './axiosClient'

type ApiQueryPromise<T = any> = Promise<AxiosClientResponse<T>>

enum ErrorMessage {
	Status = 'Server responded with a status code that falls out of the range of 2xx.',
	Response = 'The request was made but no response was received.',
	Setup = 'Something happened while setting up the request.',
}

async function apiQuery(config: AxiosClientRequestConfig): ApiQueryPromise {
	return await axiosClient(config)
		.then(({ data, status }) => {
			return { data, status }
		})
		.catch((error) => {
			if (error.response) {
				console.log(`apiQuery Error: ${ErrorMessage.Status}`)
			} else if (error.request) {
				console.log(`apiQuery Error: ${ErrorMessage.Response}`)
			} else {
				console.log(`apiQuery Error: ${ErrorMessage.Setup}`)
			}
			return {}
		})
}

export default apiQuery
