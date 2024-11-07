import axios from 'axios'
import CONST from '@src/CONST'
import CONFIG from '@src/CONFIG'
import type { AuthToken } from '@features/auth/types'

const axiosClient = axios.create({
	baseURL: CONFIG.BASE_URL,
	...CONST.AXIOS_DEFAULTS,
})

/** Takes an auth token and sets the authorization request header for the `axiosClient`. */
function setAxiosClientAuthHeaders(token: AuthToken | undefined) {
	// const authorization = `${CONST.AUTH_HEADER_TYPE} ${token}`
	// if (axiosClient.defaults.headers.common.Authorization === authorization) {
	// 	return
	// }
	axiosClient.defaults.headers.common.Authorization = token ? `${CONST.AUTH_HEADER_TYPE} ${token}` : undefined
}

const axiosBase = axios.create({ baseURL: CONFIG.BASE_URL })

export default axiosClient
export { setAxiosClientAuthHeaders }
