import { retry } from '@reduxjs/toolkit/query'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError } from 'axios'

import CONST from '@src/CONST'
import * as Url from '@libs/Url'
import * as TokenUtils from '@libs/TokenUtils'
import axiosClient from '../axiosClient'
import type { AxiosBaseQueryArgs, AxiosBaseQueryExtraOptions, AxiosBaseQueryProps } from './types'

function getRequestConfig(args: AxiosBaseQueryArgs) {
	const { url, ...requestConfig } = typeof args === 'string' ? { url: args } : args
	return {
		...requestConfig,
		url: Url.addTrailingForwardSlash(`api/${url}`),
	}
}

/**
 * Generates an axios method that is compatible with RTK Query's `baseQuery` configuration option.
 *
 * Modified from the source:
 * https://codesandbox.io/p/sandbox/react-redux-rtk-axios-gncr8b?file=%2Fsrc%2Fservices%2Faxios.ts%3A5%2C1
 */
function axiosBaseQuery<
	Args extends AxiosBaseQueryArgs = AxiosBaseQueryArgs,
	Result = unknown,
	ExtraOptions extends AxiosBaseQueryExtraOptions = AxiosBaseQueryExtraOptions,
>({ transformResponse }: AxiosBaseQueryProps = {}): BaseQueryFn<Args, Result, unknown, ExtraOptions> {
	return async (args, api, extraOptions) => {
		const requestConfig = getRequestConfig(args)

		try {
			const response = await axiosClient({
				...requestConfig,
				signal: api.signal,
				...extraOptions,
			})
			return {
				data: transformResponse ? transformResponse(response) : response.data,
			}
		} catch (error) {
			const e = error as AxiosError
			if (e.response) {
				if (e.response.status === CONST.HTTP_STATUS.UNAUTHORIZED) {
					// Unauthorized request, so try to reauthenticate the user.
					await TokenUtils.getTokenPair().then((tokenPair) => {
						if (!tokenPair) {
							retry.fail(CONST.ERROR.UNAUTHORIZED)
						}
					})
				}
			} else if (e.request) {
				// No response was recieved. ( backend not reachable )
				retry.fail(CONST.ERROR.SERVICE_UNAVAILABLE)
			}
			return {
				error: {
					status: e.response?.status || e.status,
					message: e.message,
					data: e.response?.data,
				},
			}
		}
	}
}

export default axiosBaseQuery
