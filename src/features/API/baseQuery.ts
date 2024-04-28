/**
 * docs: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#axios-basequery
 */
import type { AxiosError } from 'axios'
import { retry, BaseQueryFn } from '@reduxjs/toolkit/query'
import { attempTokenRefresh } from '@api/auth'
import axiosClient, { AxiosClientRequestConfig } from '@api/axiosClient'

const defaultQueryErrors = {
	BadRequest: {
		status: 400,
		message: 'Looks like something went wrong. Please try again later.',
	},
	Unauthorized: {
		status: 401,
		message: 'Please enter valid credentials to continue.',
	},
	ServiceUnavailable: {
		status: 503,
		message: 'Our servers may be down. Please try again later.',
	},
} as const

function getRequestConfig(args: string | AxiosClientRequestConfig) {
	if (typeof args === 'string') {
		return { url: args }
	}
	return args
}

const axiosBaseQuery = (): BaseQueryFn<string | AxiosClientRequestConfig, unknown, unknown> => {
	return async (args) => {
		const requestConfig = getRequestConfig(args)
		try {
			const response = await axiosClient(requestConfig)
			return {
				data: response.data,
			}
		} catch (error) {
			const err = error as AxiosError

			if (err.response) {
				// Error Response from server.
				if (err.response.status === 401) {
					// ( unauthorized ) attemp to reauthorize and retry original query.
					const didRefresh = await attempTokenRefresh()
					if (!didRefresh) {
						retry.fail(defaultQueryErrors['Unauthorized'])
					}
				} else {
					// all other responses with a non-2xx status code.
				}
			} else if (err.request) {
				// No response was recieved.
				retry.fail(defaultQueryErrors['ServiceUnavailable'])
			}
			return {
				error: {
					status: err.response?.status || err.status,
					data: err.response?.data || err.message,
				},
			}
		}
	}
}

const baseQuery = retry(axiosBaseQuery(), { maxRetries: 3 })

export default baseQuery

/*
const axiosBaseQuery = <
	Args extends string | AxiosClientRequestConfig = AxiosClientRequestConfig,
	Result = unknown,
	ExtraOptions = {},
	Meta = {},
>({ transformResponse, meta }: {
	transformResponse?: (response: AxiosResponse['data']) => unknown
	meta?: Meta
} = {}): BaseQueryFn<Args, Result, unknown, ExtraOptions, Meta> => {
	//  baseQuery()
	return async (args, api, extraOptions) => {
		const requestConfig = getRequestConfig(args)

		try {
			const response = await axiosClient(requestConfig)
			return {
				data: transformResponse ? transformResponse(response.data) : response.data,
			}
		} catch (error) {
			const err = error as AxiosError

			if (err.response) {
				// Error Response from server.
				if (err.response.status === 401) {
					// ( unauthorized ) attemp to reauthorize and retry original query.
					const didRefresh = await attempTokenRefresh()
					if (!didRefresh) {
						retry.fail(defaultQueryErrors['Unauthorized'])
					}
				} else {
					// all other responses with a non-2xx status code.
				}
			} else if (err.request) {
				// No response was recieved.
				retry.fail(defaultQueryErrors['ServiceUnavailable'])
			}
			return {
				error: {
					status: err.response?.status || err.status,
					data: err.response?.data || err.message,
				},
			}
		}
	}
}
*/
