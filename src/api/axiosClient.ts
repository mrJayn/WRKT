/**
 * Axios instances configuration.
 * docs: https://axios-http.com/docs/req_config
 */
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const baseURL = process.env.EXPO_PUBLIC_BASE_PATH

const axiosClientConfig = {
	baseURL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	timeout: 1000,
	withCredentials: true,
	xsrfCookieName: 'csrftoken',
	xsrfHeaderName: 'X-CSRFToken',
}

const axiosClient = axios.create(axiosClientConfig)

const axiosBase = axios.create({ baseURL })

async function setAxiosClientAuth(accessToken: string) {
	axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}

interface AxiosClientResponse<T = any> {
	data?: T
	status?: number
}

type AxiosClientRequestConfig<D = any> = Omit<AxiosRequestConfig<D>, keyof typeof axiosClientConfig>

export default axiosClient

export { axiosBase, setAxiosClientAuth }

export type { AxiosClientRequestConfig, AxiosClientResponse }
