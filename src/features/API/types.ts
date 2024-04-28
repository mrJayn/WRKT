import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

// type BaseQueryArgs = {
// 	url: AxiosRequestConfig['url']
// 	method?: AxiosRequestConfig['method']
// 	data?: AxiosRequestConfig['data']
// 	params?: AxiosRequestConfig['params']
// }

type RequestConfig = Pick<AxiosRequestConfig, 'url' | 'method' | 'data' | 'params'>

type BaseQueryProps<Meta> = {
	transformResponse?: (response: AxiosResponse['data']) => unknown
	meta?: Meta
}

export type { RequestConfig, BaseQueryProps }
