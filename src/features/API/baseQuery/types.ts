import type { AxiosResponse, Method } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

type AxiosBaseQueryRequest = {
	url: string
	method?: Method
	data?: any
	params?: any
}

type AxiosBaseQueryArgs = string | AxiosBaseQueryRequest

type AxiosBaseQueryExtraOptions = {
	timeout?: number
	validateStatus?: ((status: number) => boolean) | null
}

type AxiosBaseQueryProps = {
	transformResponse?: (response: AxiosResponse) => unknown
}

type _AxiosBaseQueryFn<
	Args extends AxiosBaseQueryArgs = AxiosBaseQueryArgs,
	Result = unknown,
	ExtraOptions extends AxiosBaseQueryExtraOptions = AxiosBaseQueryExtraOptions,
> = (props: AxiosBaseQueryProps) => BaseQueryFn<Args, Result, unknown, ExtraOptions>

export type { AxiosBaseQueryArgs, AxiosBaseQueryExtraOptions, AxiosBaseQueryProps }
